import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Phaser from 'phaser';
import { useGameStore } from '../../store/gameStore';

const BASE = import.meta.env.BASE_URL;

// ─── Sprite sheet constants ────────────────────────────────────────────────
// Source image: 1536 × 2784 px, 5 cols × 10 rows
// Rows alternate 278/279 px tall (2784/10 = 278.4), so a uniform frameHeight
// drifts 0–4 px by row 9. Load as plain image and define exact frames instead.
const FRAME_W = 307; // nominal — used only for body hitbox proportions
const FRAME_H = 278; // nominal — used only for body hitbox proportions
// Exact pixel boundaries from scripts/process_sprite.py
const SPRITE_XS = [0, 307, 614, 922, 1229, 1536] as const;
const SPRITE_YS = [0, 289, 579, 867, 1152, 1440, 1717, 1992, 2261, 2528, 2784] as const;
// Trump has ~42px top margin in each frame; Ramos fills the full cell.
// At 80px display Trump appears 65.6px tall, Ramos 79.7px. Use 66px for
// Ramos so both characters render at the same visual height (~65-66px).
const PLAYER_DISPLAY = { trump: 80, ramos: 80 } as const;

// NPC (enemy) sprite sheet: 4 cols × 4 rows, each cell 688×384 px.
// Exact pixel boundaries from scripts/process_npc_sprite.py
// Row 0: NPC1 (knife) run   — frames 0-3
// Row 1: NPC1 (knife) fall  — frames 4-7  (unused)
// Row 2: NPC2 (bat) run     — frames 8-11
// Row 3: NPC2 (bat) fall    — frames 12-15 (unused)
const NPC_FRAME_W = 688;
const NPC_FRAME_H = 384;
const NPC_XS = [0, 688, 1376, 2064, 2752] as const;
const NPC_YS = [0, 384, 768, 1152, 1536] as const;
const NPC_DISPLAY_MIN = 50;
const NPC_DISPLAY_MAX = 72;

const DEFAULT_LEVEL_SECS = 3;
const JUMP_VEL = -560;
const GRAVITY = 1500;
const BG_NATIVE_H = 1080; // native height of bg-street.png, used to scale the tile
const BG_SCROLL_BASE = 70; // px/sec — matches the pace of the run animation

type CharKey = 'trump' | 'ramos';

// Phaser numbers frames left→right, top→bottom starting at 0
const ANIM_DEFS = {
  trump: {
    run:     { s: 0,  e: 4,  fps: 8,  loop: true  },
    jump:    { s: 5,  e: 9,  fps: 6,  loop: false },
    shoot:   { s: 10, e: 14, fps: 10, loop: true  },
    fall:    { s: 15, e: 19, fps: 6,  loop: false },
    standup: { s: 20, e: 24, fps: 5,  loop: false },
  },
  ramos: {
    run:     { s: 25, e: 29, fps: 8,  loop: true  },
    jump:    { s: 30, e: 34, fps: 6,  loop: false },
    shoot:   { s: 35, e: 39, fps: 10, loop: true  },
    fall:    { s: 40, e: 44, fps: 6,  loop: false },
    standup: { s: 45, e: 49, fps: 5,  loop: false },
  },
} as const;

// ─── Shared object types ──────────────────────────────────────────────────

interface EnemyObj {
  go: Phaser.GameObjects.Sprite;
  left: number;  // x of left edge (hitbox)
  cy: number;    // y of center
  w: number;     // hitbox width
  h: number;     // hitbox height
}

interface BulletObj {
  go: Phaser.GameObjects.Arc;
  x: number;
  cy: number;
}

interface SceneOpts {
  jumpRef: React.MutableRefObject<boolean>;
  shootRef: React.MutableRefObject<boolean>;
  charKey: CharKey;
  maxLives: number;
  levelSecs: number;
  setLives: (n: number) => void;
  setProgress: (n: number) => void;
  onDone: (won: boolean) => void;
}

// ─── Scene factory ────────────────────────────────────────────────────────
// Returns a class so Phaser can call `new Class()` internally.
// Closes over opts so no module-level globals are needed.

function makeSceneClass(opts: SceneOpts) {
  const { jumpRef, shootRef, charKey, maxLives, levelSecs, setLives, setProgress, onDone } = opts;

  return class GameScene extends Phaser.Scene {
    // game objects
    player!: Phaser.Physics.Arcade.Sprite;
    bg!: Phaser.GameObjects.TileSprite;
    enemies: EnemyObj[] = [];
    bullets: BulletObj[] = [];

    // state
    lives = maxLives;
    elapsed = 0;
    done = false;
    nextEnemyAt = 2.0;
    invTimer = 0;
    fallTimer = 0;
    shootTimer = 0;
    bulletCD = 0;

    // layout
    GW = 0;
    GH = 0;
    GY = 0; // y-coordinate of ground surface

    constructor() {
      super({ key: 'Game' });
    }

    preload() {
      // Plain image load — frames are defined manually in create() with exact boundaries.
      this.load.image('spr', `${BASE}walking/player-sprite-tile.png`);
      this.load.image('npcSpr', `${BASE}walking/npc-sprite-tile.png`);
      this.load.image('bgStreet', `${BASE}minigames/bg-street.png`);
    }

    create() {
      // ── Define exact sprite frames (avoids 0–4 px drift from non-integer cell sizes) ──
      const tex = this.textures.get('spr');
      for (let i = 0; i < 50; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        tex.add(
          i, 0,
          SPRITE_XS[col], SPRITE_YS[row],
          SPRITE_XS[col + 1] - SPRITE_XS[col],
          SPRITE_YS[row + 1] - SPRITE_YS[row],
        );
      }

      // ── Define exact NPC (enemy) sprite frames ──────────────────────────
      const npcTex = this.textures.get('npcSpr');
      for (let i = 0; i < 16; i++) {
        const row = Math.floor(i / 4);
        const col = i % 4;
        npcTex.add(
          i, 0,
          NPC_XS[col], NPC_YS[row],
          NPC_XS[col + 1] - NPC_XS[col],
          NPC_YS[row + 1] - NPC_YS[row],
        );
      }

      this.GW = this.scale.width;
      this.GH = this.scale.height;
      this.GY = Math.round(this.GH * 0.885);

      this.enemies = [];
      this.bullets = [];
      this.lives = maxLives;
      setLives(this.lives);

      // ── Background: scrolling city street ─────────────────────────────
      this.bg = this.add.tileSprite(this.GW / 2, this.GH / 2, this.GW, this.GH, 'bgStreet');
      const bgScale = this.GH / BG_NATIVE_H;
      this.bg.setTileScale(bgScale, bgScale);

      // ── Ground platform (static physics body) ──────────────────────────
      // Rectangle origin defaults to 0.5,0.5 so x/y is center.
      // Positioned so that its TOP edge is exactly at GY.
      const gndRect = this.add.rectangle(
        this.GW / 2,
        this.GY + 20,   // center is 20px below ground surface
        this.GW,
        40,              // 40px tall platform
        0x000000,
        0                // invisible
      );
      this.physics.add.existing(gndRect, true /* static */);

      // ── Player sprite ───────────────────────────────────────────────────
      // Spawn well above ground; arcade physics + gravity will settle it.
      const display = PLAYER_DISPLAY[charKey];
      this.player = this.physics.add.sprite(
        Math.round(this.GW * 0.2),
        this.GY - display,
        'spr',
        0
      );
      this.player.setScale(display / FRAME_W, display / FRAME_H);
      this.player.setDepth(10);

      // Tighten the hitbox: 48% width, 78% height, centered horizontally
      const pb = this.player.body as Phaser.Physics.Arcade.Body;
      pb.setSize(
        Math.round(FRAME_W * 0.48),
        Math.round(FRAME_H * 0.78)
      );
      pb.setOffset(
        Math.round(FRAME_W * 0.26),
        Math.round(FRAME_H * 0.20)
      );

      // Collide player with ground
      this.physics.add.collider(this.player, gndRect);

      // ── Animations ─────────────────────────────────────────────────────
      for (const [ck, defs] of Object.entries(ANIM_DEFS)) {
        for (const [action, def] of Object.entries(defs)) {
          const key = `${ck}_${action}`;
          if (!this.anims.exists(key)) {
            this.anims.create({
              key,
              frames: this.anims.generateFrameNumbers('spr', { start: def.s, end: def.e }),
              frameRate: def.fps,
              repeat: def.loop ? -1 : 0,
            });
          }
        }
      }

      this.player.play(`${charKey}_run`);

      // NPC run animations (2 character variants)
      if (!this.anims.exists('npc1_run')) {
        this.anims.create({
          key: 'npc1_run',
          frames: this.anims.generateFrameNumbers('npcSpr', { start: 0, end: 3 }),
          frameRate: 8,
          repeat: -1,
        });
      }
      if (!this.anims.exists('npc2_run')) {
        this.anims.create({
          key: 'npc2_run',
          frames: this.anims.generateFrameNumbers('npcSpr', { start: 8, end: 11 }),
          frameRate: 8,
          repeat: -1,
        });
      }
    }

    update(_time: number, delta: number) {
      if (this.done) return;
      const dt = delta / 1000;

      // Timers
      this.elapsed += dt;
      const progress = Math.min(1, this.elapsed / levelSecs);
      this.bulletCD = Math.max(0, this.bulletCD - dt);
      if (this.invTimer > 0) this.invTimer -= dt;
      if (this.shootTimer > 0) this.shootTimer -= dt;
      const inFall = this.fallTimer > 0;
      if (inFall) this.fallTimer -= dt;

      setProgress(progress);

      // Scroll the street backdrop so the player appears to advance through the city
      this.bg.tilePositionX += (BG_SCROLL_BASE + progress * 40) * dt;

      const body = this.player.body as Phaser.Physics.Arcade.Body;
      const onGround = body.blocked.down;

      // ── Input ────────────────────────────────────────────────────────────
      if (!inFall && this.invTimer <= 0) {
        if (jumpRef.current && onGround) {
          body.setVelocityY(JUMP_VEL);
        }
        if (shootRef.current && this.bulletCD <= 0) {
          this.fireBullet();
          this.bulletCD = 0.28;
          this.shootTimer = 0.32;
        }
      }

      // ── Animation ────────────────────────────────────────────────────────
      const targetAnim = inFall
        ? `${charKey}_${this.fallTimer > 0.5 ? 'fall' : 'standup'}`
        : !onGround
          ? `${charKey}_jump`
          : this.shootTimer > 0
            ? `${charKey}_shoot`
            : `${charKey}_run`;

      if (this.player.anims.currentAnim?.key !== targetAnim) {
        this.player.play(targetAnim);
      }

      // Flash player when invincible
      this.player.setAlpha(
        this.invTimer > 0 && Math.floor(this.invTimer * 10) % 2 === 0 ? 0.2 : 1
      );

      // ── Spawn enemies ────────────────────────────────────────────────────
      if (this.elapsed >= this.nextEnemyAt && progress < 0.93) {
        this.spawnEnemy(progress);
      }

      // ── Move & cull bullets ──────────────────────────────────────────────
      this.bullets = this.bullets.filter(b => {
        b.x += 500 * dt;
        b.go.x = b.x;
        if (b.x > this.GW + 80) {
          b.go.destroy();
          return false;
        }
        return true;
      });

      // ── Move & cull enemies ──────────────────────────────────────────────
      const enemySpeed = 190 + progress * 100;
      this.enemies = this.enemies.filter(e => {
        e.left -= enemySpeed * dt;
        e.go.x = e.left + e.w / 2; // sprite x = center
        if (e.left + e.w < -80) {
          e.go.destroy();
          return false;
        }
        return true;
      });

      // ── Bullet ↔ enemy collision ─────────────────────────────────────────
      outer: for (let bi = this.bullets.length - 1; bi >= 0; bi--) {
        const b = this.bullets[bi];
        for (let ei = this.enemies.length - 1; ei >= 0; ei--) {
          const e = this.enemies[ei];
          const eTop = e.cy - e.h / 2;
          const eBot = e.cy + e.h / 2;
          if (
            b.x + 8 > e.left && b.x - 8 < e.left + e.w &&
            b.cy + 8 > eTop   && b.cy - 8 < eBot
          ) {
            b.go.destroy();
            this.bullets.splice(bi, 1);
            e.go.destroy();
            this.enemies.splice(ei, 1);
            continue outer;
          }
        }
      }

      // ── Player ↔ enemy collision ─────────────────────────────────────────
      if (this.invTimer <= 0 && !inFall) {
        const pb = this.player.getBounds();
        // Shrink hitbox for fairness
        const hx1 = pb.x + pb.width * 0.22;
        const hy1 = pb.y + pb.height * 0.10;
        const hx2 = pb.x + pb.width * 0.78;
        const hy2 = pb.y + pb.height * 0.90;

        for (let ei = this.enemies.length - 1; ei >= 0; ei--) {
          const e = this.enemies[ei];
          const ex1 = e.left, ey1 = e.cy - e.h / 2;
          const ex2 = e.left + e.w, ey2 = e.cy + e.h / 2;

          if (hx2 > ex1 && hx1 < ex2 && hy2 > ey1 && hy1 < ey2) {
            e.go.destroy();
            this.enemies.splice(ei, 1);
            this.lives--;
            this.invTimer = 1.0;
            this.fallTimer = 1.1;
            setLives(this.lives);
            if (this.lives <= 0) {
              this.done = true;
              this.player.play(`${charKey}_fall`);
              this.time.delayedCall(800, () => onDone(false));
              return;
            }
            break;
          }
        }
      }

      // ── Win ──────────────────────────────────────────────────────────────
      if (progress >= 1 && !this.done) {
        this.done = true;
        this.time.delayedCall(400, () => onDone(true));
      }
    }

    fireBullet() {
      const bx = this.player.x + 45;
      const by = this.player.y - 3;
      const go = this.add.circle(bx, by, 7, 0xfbbf24);
      go.setDepth(8);
      this.bullets.push({ go, x: bx, cy: by });
    }

    spawnEnemy(progress: number) {
      const flying = Math.random() < 0.3;
      const npcId: 1 | 2 = Math.random() < 0.5 ? 1 : 2;

      // Display height varies for a bit of size variety; width follows from
      // the sprite's native aspect ratio so the art never looks stretched.
      const display = Math.round(NPC_DISPLAY_MIN + Math.random() * (NPC_DISPLAY_MAX - NPC_DISPLAY_MIN));
      const scale = display / NPC_FRAME_H;
      const dispW = NPC_FRAME_W * scale;

      // Hitbox is tighter than the full sprite frame (which has transparent
      // padding around the character), matching the tightened player hitbox.
      const w = Math.round(dispW * 0.46);
      const h = Math.round(display * 0.82);
      const cy = flying
        ? this.GY - 58            // flying: mid-air
        : this.GY - display / 2;  // ground: feet on GY

      const left = this.GW + 40;
      const go = this.add.sprite(left + w / 2, cy, 'npcSpr', npcId === 1 ? 0 : 8);
      go.setScale(scale);
      go.setDepth(5);
      // Sprite art faces right (running toward positive x); enemies move
      // leftward toward the player, so flip to face the direction of travel.
      go.setFlipX(true);
      go.play(`npc${npcId}_run`);

      this.enemies.push({ go, left, cy, w, h });

      const interval = Math.max(0.5, 1.3 - progress * 0.6 + (Math.random() - 0.5) * 0.5);
      this.nextEnemyAt = this.elapsed + interval;
    }
  };
}

// ─── React wrapper ────────────────────────────────────────────────────────

interface Props {
  travelSecs?: number;
  onComplete: (deltas: { vitality: number; knowledge?: number }) => void;
}

export default function SideScroller({ travelSecs = DEFAULT_LEVEL_SECS, onComplete }: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const firedRef = useRef(false);

  const [uiPhase, setUiPhase] = useState<'running' | 'win' | 'lose'>('running');
  const [uiLives, setUiLives] = useState(3);
  const [uiProgress, setUiProgress] = useState(0);
  const resultRef = useRef<{ vitality: number; knowledge?: number }>({ vitality: 0 });

  const vitality = useGameStore(s => s.stats.vitality);
  const chosenCharacter = useGameStore(s => s.chosenCharacter);

  const charKey: CharKey = chosenCharacter === 'ramos' ? 'ramos' : 'trump';
  const maxLives = Math.max(1, Math.min(3, Math.ceil(vitality / 34)));

  const jumpRef = useRef(false);
  const shootRef = useRef(false);

  const handleDone = useCallback((won: boolean) => {
    if (firedRef.current) return;
    firedRef.current = true;
    resultRef.current = won ? { vitality: 5, knowledge: 3 } : { vitality: -10 };
    setUiPhase(won ? 'win' : 'lose');
  }, []);

  const startGame = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    // Tear down any previous game
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
    firedRef.current = false;
    jumpRef.current = false;
    shootRef.current = false;
    setUiLives(maxLives);
    setUiProgress(0);

    const SceneClass = makeSceneClass({
      jumpRef,
      shootRef,
      charKey,
      maxLives,
      levelSecs: travelSecs,
      setLives: setUiLives,
      setProgress: setUiProgress,
      onDone: handleDone,
    });

    const W = el.clientWidth;
    const H = el.clientHeight;

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: W,
      height: H,
      parent: el,
      backgroundColor: '#1a1a3e',
      physics: {
        default: 'arcade',
        arcade: { gravity: { x: 0, y: GRAVITY }, debug: false },
      },
      scene: SceneClass as any,
      audio: { noAudio: true },
      banner: false,
      scale: { mode: Phaser.Scale.NONE },
    });

    setUiPhase('running');
  }, [charKey, maxLives, travelSecs, handleDone]);

  // Auto-start on mount, cleanup on unmount
  useEffect(() => {
    startGame();
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Desktop keyboard support
  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === ' ') { e.preventDefault(); jumpRef.current = true; }
      if ('zZxX'.includes(e.key)) shootRef.current = true;
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === ' ') jumpRef.current = false;
      if ('zZxX'.includes(e.key)) shootRef.current = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
    };
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#1a1a2e] select-none touch-none">

      {/* ── HUD ── */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-2 bg-[#16213e]/90 border-b border-[#e94560]/20">
        <div className="flex gap-1">
          {Array.from({ length: maxLives }).map((_, i) => (
            <span
              key={i}
              className={`text-base leading-none ${i < uiLives ? '' : 'opacity-20 grayscale'}`}
            >
              ❤️
            </span>
          ))}
        </div>
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a]"
            style={{ width: `${uiProgress * 100}%`, transition: 'width 0.15s linear' }}
          />
        </div>
      </div>

      {/* ── Phaser canvas container ── */}
      <div ref={containerRef} className="flex-1 min-h-0 relative overflow-hidden">

        {/* Win overlay */}
        {uiPhase === 'win' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 gap-4">
            <span className="text-6xl">🏆</span>
            <p className="pixel-text text-white text-2xl">{t('minigames.sideScroller.arrived')}</p>
            <p className="text-green-400 font-semibold">{t('minigames.sideScroller.winReward')}</p>
            <button
              onClick={() => onComplete(resultRef.current)}
              className="mt-4 px-10 py-3 rounded-2xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-bold text-base active:scale-95 transition-all"
            >
              {t('ui.continue')}
            </button>
          </div>
        )}

        {/* Lose overlay */}
        {uiPhase === 'lose' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 gap-4">
            <span className="text-6xl">💀</span>
            <p className="pixel-text text-white text-2xl">{t('minigames.sideScroller.knockedOut')}</p>
            <p className="text-red-400 font-semibold">{t('minigames.sideScroller.loseReward')}</p>
            <button
              onClick={() => onComplete(resultRef.current)}
              className="mt-4 px-10 py-3 rounded-2xl bg-gradient-to-r from-[#e94560] to-[#c0392b] text-white font-bold text-base active:scale-95 transition-all"
            >
              {t('ui.continue')}
            </button>
          </div>
        )}
      </div>

      {/* ── Controls ── */}
      <div className="shrink-0 grid grid-cols-2 gap-3 p-4 bg-[#0a0a14] border-t border-gray-800/60">
        <button
          onPointerDown={() => { jumpRef.current = true; }}
          onPointerUp={() => { jumpRef.current = false; }}
          onPointerLeave={() => { jumpRef.current = false; }}
          onPointerCancel={() => { jumpRef.current = false; }}
          className="py-7 rounded-2xl bg-[#0f3460] border-2 border-[#f59e0b]/60
            text-white font-bold text-xl active:scale-95 active:bg-[#f59e0b]/20
            transition-transform touch-none"
        >
          {t('minigames.sideScroller.jump')}
        </button>
        <button
          onPointerDown={() => { shootRef.current = true; }}
          onPointerUp={() => { shootRef.current = false; }}
          onPointerLeave={() => { shootRef.current = false; }}
          onPointerCancel={() => { shootRef.current = false; }}
          className="py-7 rounded-2xl bg-[#e94560]/15 border-2 border-[#e94560]
            text-white font-bold text-xl active:scale-95 active:bg-[#e94560]/40
            transition-transform touch-none"
        >
          {t('minigames.sideScroller.shoot')}
        </button>
      </div>
    </div>
  );
}

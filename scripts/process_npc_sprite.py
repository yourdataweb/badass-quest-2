#!/usr/bin/env python3
"""
process_npc_sprite.py  —  Remove the checkerboard background from the NPC sprite tile.

The source image (public/walking/npc-sprite-tile-border.png) was generated with a grey/white
checkerboard background around each character frame. This script uses a per-frame
flood-fill from the cell corners to detect and remove that connected background region,
setting those pixels to alpha=0. White/grey pixels inside the character (eyes, teeth, etc.)
are preserved because they are surrounded by non-background pixels and are not reached
by the fill. A second pass (strip_edge_seam) then removes the thin dark seam left at
each crop boundary that the flood fill can't reach because it's too dark to match
is_background().

Usage:
    python3 scripts/process_npc_sprite.py
    # Reads:  public/walking/npc-sprite-tile-border.png
    # Writes: public/walking/npc-sprite-tile.png

Frame layout: 4 cols × 4 rows
    Row 0: NPC1 (knife thief) run
    Row 1: NPC1 (knife thief) fall
    Row 2: NPC2 (bat thief)   run
    Row 3: NPC2 (bat thief)   fall
"""

import sys
from collections import deque
from pathlib import Path
import numpy as np
from PIL import Image

REPO_ROOT = Path(__file__).parent.parent
SRC = REPO_ROOT / "public" / "walking" / "npc-sprite-tile-border.png"
DESTINATION = REPO_ROOT / "public" / "walking" / "npc-sprite-tile.png"

COLS = 4
ROWS = 4

# Background detection: low saturation (near-grey) AND not very dark (dark outlines are kept)
BG_SAT_THRESHOLD = 30   # max(R,G,B) - min(R,G,B)  <  this → near-grey
BG_MIN_BRIGHTNESS = 60  # avg(R,G,B)  >  this        → not a dark character outline


def is_background(r: int, g: int, b: int) -> bool:
    return (max(r, g, b) - min(r, g, b)) < BG_SAT_THRESHOLD and (r + g + b) // 3 > BG_MIN_BRIGHTNESS


def flood_fill_background(cell: np.ndarray) -> np.ndarray:
    """
    Given a cell (H×W×4 RGBA array), flood-fill from all border pixels that match
    is_background(), mark those pixels alpha=0, and return the modified array.
    """
    h, w = cell.shape[:2]
    visited = np.zeros((h, w), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    def enqueue(y: int, x: int) -> None:
        if not visited[y, x]:
            r, g, b = int(cell[y, x, 0]), int(cell[y, x, 1]), int(cell[y, x, 2])
            if is_background(r, g, b):
                visited[y, x] = True
                queue.append((y, x))

    # Seed from a margin band along all four edges (not just the single boundary
    # pixel) — some frames have a 1-2px dark seam right at the crop line where
    # adjacent rows' artwork bleeds across the grid boundary, which would
    # otherwise block seeding entirely and leave the whole cell's checkerboard
    # untouched.
    MARGIN = 8
    for x in range(w):
        for m in range(MARGIN):
            enqueue(m, x)
            enqueue(h - 1 - m, x)
    for y in range(h):
        for m in range(MARGIN):
            enqueue(y, m)
            enqueue(y, w - 1 - m)

    # 4-connected flood fill
    while queue:
        y, x = queue.popleft()
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w:
                enqueue(ny, nx)

    result = cell.copy()
    result[visited, 3] = 0
    return result


def strip_edge_seam(cell: np.ndarray, max_seam: int = 6) -> None:
    """
    In-place: zero out short (<= max_seam px) runs of still-opaque pixels that
    sit directly between a frame edge and an already-transparent region.

    The generated grid has a 1-4px dark seam right at each crop boundary
    (adjacent cells' artwork bleeding across the line), which is too dark to
    match is_background() and therefore survives flood_fill_background(),
    showing up as a thin dark border around every sprite frame. Real
    character content touching an edge (a hand, a shoe) is always far
    thicker than a few pixels, so a short run before hitting transparency
    safely identifies seam, not character.
    """
    h, w = cell.shape[:2]
    alpha = cell[:, :, 3]

    def scan(coords: list[tuple[int, int]]) -> None:
        run: list[tuple[int, int]] = []
        for y, x in coords:
            if alpha[y, x] == 0:
                if run and len(run) <= max_seam:
                    for ry, rx in run:
                        alpha[ry, rx] = 0
                return
            run.append((y, x))

    for x in range(w):
        scan([(y, x) for y in range(h)])
        scan([(y, x) for y in range(h - 1, -1, -1)])
    for y in range(h):
        scan([(y, x) for x in range(w)])
        scan([(y, x) for x in range(w - 1, -1, -1)])


def compute_frame_boundaries(total: int, count: int) -> list[int]:
    """Return count+1 pixel boundaries, evenly distributed (may vary by 1px)."""
    return [round(i * total / count) for i in range(count + 1)]


def main() -> None:
    if not SRC.exists():
        print(f"ERROR: {SRC} not found", file=sys.stderr)
        sys.exit(1)

    img = Image.open(SRC).convert("RGBA")
    arr = np.array(img, dtype=np.uint8)
    W, H = img.size
    print(f"Loaded {SRC.name}  ({W}×{H} px, {COLS}×{ROWS} grid)")

    xs = compute_frame_boundaries(W, COLS)
    ys = compute_frame_boundaries(H, ROWS)
    print(f"Column boundaries (px): {xs}")
    print(f"Row boundaries (px):    {ys}")
    print(f"Frame sizes: cols {[xs[i+1]-xs[i] for i in range(COLS)]}, "
          f"rows {[ys[i+1]-ys[i] for i in range(ROWS)]}")

    out = arr.copy()
    total_bg = 0

    row_labels = ["NPC1 run", "NPC1 fall", "NPC2 run", "NPC2 fall"]

    for row in range(ROWS):
        for col in range(COLS):
            y0, y1 = ys[row], ys[row + 1]
            x0, x1 = xs[col], xs[col + 1]
            cell = arr[y0:y1, x0:x1].copy()

            processed = flood_fill_background(cell)
            strip_edge_seam(processed)
            removed = int((processed[:, :, 3] == 0).sum() - (cell[:, :, 3] == 0).sum())
            total_bg += removed
            out[y0:y1, x0:x1] = processed

            print(f"  [{row_labels[row]} frame {col}]  cell ({x0},{y0})-({x1},{y1})  "
                  f"bg removed: {removed} px")

    print(f"\nTotal background pixels removed: {total_bg}")

    result_img = Image.fromarray(out, "RGBA")
    result_img.save(DESTINATION, optimize=False)
    print(f"Saved: {DESTINATION}")


if __name__ == "__main__":
    main()

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/gameStore';
import GameLayout from '../components/GameLayout';
import ActivityCard from '../components/ActivityCard';
import { DAILY_ACTIVITIES } from '../engine/economyEngine';
import type { DailyActivity } from '../store/types';

interface ActivityPickerScreenProps {
  onComplete: () => void;
  maxActivities?: number;
}

/** The day ends at 11PM. */
const DAY_END_HOUR = 23;

export default function ActivityPickerScreen({ onComplete, maxActivities = 3 }: ActivityPickerScreenProps) {
  const { t, i18n } = useTranslation();
  const updateStats = useGameStore((s) => s.updateStats);
  const advanceTime = useGameStore((s) => s.advanceTime);
  const time = useGameStore((s) => s.time);

  const availableHours = Math.max(0, DAY_END_HOUR - (time.hour + time.minute / 60));

  const [selected, setSelected] = useState<DailyActivity[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const getTitle = (act: DailyActivity): string => {
    if (i18n.language === 'ca' && act.titleCa) return act.titleCa;
    if (i18n.language === 'es' && act.titleEs) return act.titleEs;
    return act.title;
  };

  const getDesc = (act: DailyActivity): string => {
    if (i18n.language === 'ca' && act.descriptionCa) return act.descriptionCa;
    if (i18n.language === 'es' && act.descriptionEs) return act.descriptionEs;
    return act.description;
  };

  const isSelected = (act: DailyActivity): boolean => {
    return selected.some((s) => s.id === act.id);
  };

  const totalHours = selected.reduce((sum, a) => sum + a.durationHours, 0);
  const hoursLeft = Math.max(0, Math.round((availableHours - totalHours) * 4) / 4);

  const toggleActivity = (act: DailyActivity) => {
    if (confirmed) return;
    if (isSelected(act)) {
      setSelected((prev) => prev.filter((s) => s.id !== act.id));
    } else {
      if (selected.length < maxActivities && totalHours + act.durationHours <= availableHours) {
        setSelected((prev) => [...prev, act]);
      }
    }
  };

  const handleConfirm = () => {
    selected.forEach((act) => {
      updateStats(act.effects);
      advanceTime(act.durationHours);
    });
    setConfirmed(true);
    setTimeout(onComplete, 500);
  };

  return (
    <GameLayout>
      <div className="flex flex-col h-full">

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-4 max-w-2xl mx-auto fade-in">
            <h2 className="text-white font-bold text-lg mb-1">{t('ui.chooseActivity')}</h2>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#252525] border border-gray-700 text-gray-200 text-xs font-semibold">
                ⏳ {hoursLeft}h {t('ui.timeRemaining')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#252525] border border-gray-700 text-gray-200 text-xs font-semibold">
                📋 {selected.length}/{maxActivities} {t('ui.activitiesRemaining')}
              </span>
            </div>

            {/* Selected summary */}
            {selected.length > 0 && (
              <div className="dialogue-box p-3">
                <p className="text-xs text-gray-500 mb-2">
                  {i18n.language === 'ca' ? 'Resum del dia:' : i18n.language === 'es' ? 'Resumen del día:' : "Today's plan:"}
                </p>
                <ul className="space-y-1 text-sm text-gray-300">
                  {selected.map((act) => (
                    <li key={act.id} className="flex items-center gap-2">
                      <span className="text-[#e94560]">•</span>
                      <span>{getTitle(act)} ({act.durationHours}h)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ── Sticky activity grid + confirm button ── */}
        <div className="shrink-0 px-4 py-3 bg-[#191919] border-t border-gray-700">
          <div className="max-w-2xl mx-auto flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              {DAILY_ACTIVITIES.map((act) => {
                const sel = isSelected(act);
                const tooMany = selected.length >= maxActivities && !sel;
                const tooLong = totalHours + act.durationHours > availableHours;
                const disabled = (tooMany || tooLong) && !sel;
                return (
                  <ActivityCard
                    key={act.id}
                    title={getTitle(act)}
                    description={getDesc(act)}
                    durationHours={act.durationHours}
                    effects={act.effects}
                    selected={sel}
                    disabled={disabled}
                    onClick={() => toggleActivity(act)}
                  />
                );
              })}
            </div>
            <button
              onClick={handleConfirm}
              disabled={selected.length === 0 || confirmed}
              className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm active:scale-[0.98] ${
                selected.length > 0 && !confirmed
                  ? 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white shadow-lg shadow-[#22c55e]/25 hover:brightness-110'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-700'
              }`}
            >
              {confirmed
                ? (i18n.language === 'ca' ? '✅ Dia completat!' : i18n.language === 'es' ? '✅ ¡Día completado!' : '✅ Day completed!')
                : (i18n.language === 'ca' ? 'Acabar el dia' : i18n.language === 'es' ? 'Terminar el día' : 'Finish day')}
            </button>
          </div>
        </div>

      </div>
    </GameLayout>
  );
}
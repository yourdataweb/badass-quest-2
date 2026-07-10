import type { Stats } from '../store/types';

export const ACTIVITY_STAT_ICONS: Record<string, string> = {
  vitality: '💪',
  resources: '💰',
  knowledge: '🧠',
  social: '👥',
  career: '💼',
  fulfillment: '❤️',
};

interface ActivityCardProps {
  icon?: string;
  title: string;
  description?: string;
  durationHours: number;
  effects: Partial<Stats>;
  /** Shows the grey/checked "already picked" look. Purely visual. */
  selected?: boolean;
  /** Blocks the click. Separate from `selected` so a picker can keep a selected card clickable (to deselect). */
  disabled?: boolean;
  onClick: () => void;
}

/**
 * Shared card used for every "pick an activity" surface: home actions,
 * location mini-games, and the daily activity picker. Keeping one
 * implementation is what keeps their look (idle/hover/selected) in sync.
 */
export default function ActivityCard({
  icon,
  title,
  description,
  durationHours,
  effects,
  selected = false,
  disabled = false,
  onClick,
}: ActivityCardProps) {
  const inactive = selected || disabled;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-xl text-left transition-all active:scale-[0.97] ${
        inactive
          ? 'bg-[#252525] border border-gray-700 opacity-75 cursor-not-allowed'
          : 'bg-[#0c3a38] border border-[#0d9488]/60 hover:bg-[#0f4a47] hover:border-[#0d9488] cursor-pointer shadow-md shadow-black/20'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        {icon && <span className="text-base">{icon}</span>}
        <span className="text-white font-semibold text-sm truncate">{title}</span>
        {selected && <span className="ml-auto text-green-400 text-xs">✓</span>}
      </div>
      {description && <div className="text-gray-400 text-xs mb-1">{description}</div>}
      <div className={`flex flex-wrap gap-x-2 text-xs ${inactive ? 'text-gray-500' : 'text-teal-200/70'}`}>
        {durationHours > 0 && <span>⏳ {durationHours}h</span>}
        {Object.entries(effects).map(([k, v]) => {
          if (!v) return null;
          return (
            <span key={k} className={v > 0 ? 'text-green-400' : 'text-red-500'}>
              {ACTIVITY_STAT_ICONS[k] ?? k}{v > 0 ? '+' : ''}{v}
            </span>
          );
        })}
      </div>
    </button>
  );
}

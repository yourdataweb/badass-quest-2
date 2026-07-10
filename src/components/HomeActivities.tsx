import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/gameStore';
import ActivityCard from './ActivityCard';
import type { Stats } from '../store/types';

interface HomeActivityDef {
  id: string;
  icon: string;
  labelKey: string;
  descKey: string;
  effects: Partial<Stats>;
  durationHours: number;
}

const HOME_ACTIVITIES: HomeActivityDef[] = [
  {
    id: 'breakfast',
    icon: '🥐',
    labelKey: 'home.breakfast',
    descKey: 'home.breakfastDesc',
    effects: { vitality: 3, resources: -3 },
    durationHours: 0.5,
  },
  {
    id: 'work',
    icon: '💻',
    labelKey: 'home.workRemotely',
    descKey: 'home.workRemotelyDesc',
    effects: { resources: 30, career: 2, vitality: -3 },
    durationHours: 4,
  },
];

export default function HomeActivities() {
  const { t } = useTranslation();
  const updateStats = useGameStore((s) => s.updateStats);
  const advanceTime = useGameStore((s) => s.advanceTime);
  const usedActions = useGameStore((s) => s.usedHomeActions);
  const addUsedHomeAction = useGameStore((s) => s.addUsedHomeAction);

  const isUsed = (id: string) => usedActions.includes(id);

  const handleActivity = (action: HomeActivityDef) => {
    if (isUsed(action.id)) return;
    addUsedHomeAction(action.id);
    updateStats(action.effects);
    if (action.durationHours > 0) advanceTime(action.durationHours);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {HOME_ACTIVITIES.map((action) => {
        const done = isUsed(action.id);
        return (
          <ActivityCard
            key={action.id}
            icon={action.icon}
            title={t(action.labelKey)}
            description={t(action.descKey)}
            durationHours={action.durationHours}
            effects={action.effects}
            selected={done}
            disabled={done}
            onClick={() => handleActivity(action)}
          />
        );
      })}
    </div>
  );
}

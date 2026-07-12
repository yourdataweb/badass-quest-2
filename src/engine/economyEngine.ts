import type { Stats, DailyActivity } from '../store/types';

export const DAILY_ACTIVITIES: DailyActivity[] = [
  {
    id: 'read',
    durationHours: 3,
    effects: { knowledge: 4, fulfillment: 1 },
  },
  {
    id: 'sport',
    durationHours: 2,
    effects: { vitality: 5, resources: -5 },
  },
  {
    id: 'socialize',
    durationHours: 3,
    effects: { social: 4, resources: -15, fulfillment: 2 },
  },
  {
    id: 'sleep',
    durationHours: 10,
    effects: { vitality: 8, resources: -5 },
  },
];

export function getActivityByName(id: string): DailyActivity | undefined {
  return DAILY_ACTIVITIES.find((a) => a.id === id);
}

export function canAffordActivity(activity: DailyActivity, stats: Stats): boolean {
  const cost = Math.abs(activity.effects.resources ?? 0);
  return stats.resources >= cost;
}

export function calculateRent(): number {
  return 50;
}

export function calculateSalaryMultiplier(career: number): number {
  return 1 + career / 100;
}

export function calculateTransportCost(distanceKm: number): number {
  return Math.max(2, Math.round(distanceKm * 0.5));
}

export function getDayCount(stats: Stats): string {
  const total = stats.vitality + stats.resources + stats.knowledge + stats.social + stats.career + stats.fulfillment;
  if (total < 100) return 'struggling';
  if (total < 200) return 'getting by';
  if (total < 300) return 'finding your way';
  if (total < 400) return 'thriving';
  return 'flourishing';
}
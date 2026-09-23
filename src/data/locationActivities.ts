import type { Stats } from '../store/types';

export type MiniGameKind = 'quick_quiz' | 'tap_challenge' | 'pickpocket' | 'brawl' | 'chase' | 'lockpick' | 'photograph';

export interface ActivityDef {
  id: string;
  i18nKey: string;
  miniGame: MiniGameKind;
  durationHours: number;
  effects: Partial<Stats>;
  /** Index of the correct option for each quiz question; text lives in the `activities` namespace. */
  quizAnswers?: number[];
}

const ACTIVITIES: Record<string, ActivityDef[]> = {
  library: [
    {
      id: 'library_read',
      i18nKey: 'libraryRead',
      miniGame: 'quick_quiz',
      durationHours: 1.5,
      effects: { knowledge: 5 },
      quizAnswers: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'library_research',
      i18nKey: 'libraryResearch',
      miniGame: 'quick_quiz',
      durationHours: 2,
      effects: { knowledge: 3, career: 2 },
      quizAnswers: [1, 1, 2, 1, 1, 1, 1],
    },
  ],

  park: [
    {
      id: 'park_exercise',
      i18nKey: 'parkExercise',
      miniGame: 'chase',
      durationHours: 1,
      effects: { vitality: 5 },
    },
    {
      id: 'park_meditate',
      i18nKey: 'parkMeditate',
      miniGame: 'quick_quiz',
      durationHours: 1,
      effects: { fulfillment: 4 },
      quizAnswers: [1, 0, 1, 1, 1, 1, 1],
    },
  ],

  cafe: [
    {
      id: 'cafe_discussion',
      i18nKey: 'cafeDiscussion',
      miniGame: 'brawl',
      durationHours: 1,
      effects: { social: 4 },
    },
    {
      id: 'cafe_write',
      i18nKey: 'cafeWrite',
      miniGame: 'quick_quiz',
      durationHours: 2,
      effects: { career: 3, knowledge: 2 },
      quizAnswers: [1, 1, 1, 1, 1, 1, 1],
    },
  ],

  market: [
    {
      id: 'market_haggle',
      i18nKey: 'marketHaggle',
      miniGame: 'pickpocket',
      durationHours: 1,
      effects: { resources: 5, social: 2 },
    },
    {
      id: 'market_taste',
      i18nKey: 'marketTaste',
      miniGame: 'quick_quiz',
      durationHours: 0.5,
      effects: { vitality: 3, resources: 2 },
      quizAnswers: [1, 1, 1, 1, 1, 1, 1],
    },
  ],

  plaza: [
    {
      id: 'plaza_street',
      i18nKey: 'plazaStreet',
      miniGame: 'pickpocket',
      durationHours: 1,
      effects: { social: 3, resources: 3 },
    },
    {
      id: 'plaza_people',
      i18nKey: 'plazaPeople',
      miniGame: 'quick_quiz',
      durationHours: 1,
      effects: { social: 2, knowledge: 2 },
      quizAnswers: [1, 1, 1, 1, 1, 1, 1],
    },
  ],

  church: [
    {
      id: 'church_contemplate',
      i18nKey: 'churchContemplate',
      miniGame: 'quick_quiz',
      durationHours: 1,
      effects: { fulfillment: 5 },
      quizAnswers: [1, 1, 2, 1, 1, 0, 1],
    },
    {
      id: 'church_inspect',
      i18nKey: 'churchInspect',
      miniGame: 'quick_quiz',
      durationHours: 1.5,
      effects: { knowledge: 4 },
      quizAnswers: [1, 1, 1, 1, 1, 1, 1],
    },
  ],

  theatre: [
    {
      id: 'theatre_watch',
      i18nKey: 'theatreWatch',
      miniGame: 'quick_quiz',
      durationHours: 2,
      effects: { fulfillment: 3, knowledge: 2 },
      quizAnswers: [1, 2, 1, 1, 1, 1, 1],
    },
  ],

  office: [
    {
      id: 'office_network',
      i18nKey: 'officeNetwork',
      miniGame: 'brawl',
      durationHours: 1,
      effects: { career: 3, social: 2 },
    },
    {
      id: 'office_upskill',
      i18nKey: 'officeUpskill',
      miniGame: 'quick_quiz',
      durationHours: 2,
      effects: { career: 4, knowledge: 2 },
      quizAnswers: [2, 1, 1, 1, 1, 1, 1],
    },
  ],

  monument: [
    {
      id: 'monument_photo',
      i18nKey: 'monumentPhoto',
      miniGame: 'photograph',
      durationHours: 1,
      effects: { fulfillment: 3, knowledge: 2 },
    },
    {
      id: 'monument_study',
      i18nKey: 'monumentStudy',
      miniGame: 'quick_quiz',
      durationHours: 1.5,
      effects: { knowledge: 4 },
      quizAnswers: [1, 1, 1, 1, 1, 2, 1],
    },
  ],
};

const ALL_TYPES = [
  'plaza', 'library', 'park', 'market', 'church',
  'monument', 'cafe', 'theatre', 'office',
] as const;

for (const t of ALL_TYPES) {
  if (!ACTIVITIES[t]) {
    ACTIVITIES[t] = [
      {
        id: `${t}_default`,
        i18nKey: `${t}Default`,
        miniGame: 'quick_quiz',
        durationHours: 1,
        effects: { knowledge: 2 },
      },
    ];
  }
}

export function getActivitiesForType(type: string): ActivityDef[] {
  return ACTIVITIES[type] ?? ACTIVITIES.plaza;
}

export default ACTIVITIES;

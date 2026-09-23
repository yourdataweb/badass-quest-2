import type { TFunction } from 'i18next';

/**
 * Key-builder functions for the `cities`, `story` and `activities` i18next
 * namespaces. Application code should call these instead of reading
 * translated text off data objects or reimplementing language selection —
 * the data files only carry IDs.
 */

export const cityName = (t: TFunction, cityId: string): string =>
  t(`cities:${cityId}.name`);

export const cityCountry = (t: TFunction, cityId: string): string =>
  t(`cities:${cityId}.country`);

export const locationName = (t: TFunction, cityId: string, locationId: string): string =>
  t(`cities:${cityId}.locations.${locationId}.name`);

export const locationDescription = (t: TFunction, cityId: string, locationId: string): string =>
  t(`cities:${cityId}.locations.${locationId}.description`);

export const storyTitle = (t: TFunction, bookId: string): string =>
  t(`story:${bookId}.title`);

export const storyIntro = (t: TFunction, bookId: string): string =>
  t(`story:${bookId}.intro`);

export const chapterTitle = (t: TFunction, bookId: string, chapterId: string): string =>
  t(`story:${bookId}.chapters.${chapterId}.title`);

export const chapterDescription = (t: TFunction, bookId: string, chapterId: string): string =>
  t(`story:${bookId}.chapters.${chapterId}.description`);

export const dialogueText = (t: TFunction, bookId: string, nodeId: string): string =>
  t(`story:${bookId}.dialogue.${nodeId}.text`);

export const optionText = (t: TFunction, bookId: string, optionId: string): string =>
  t(`story:${bookId}.options.${optionId}.text`);

export const momentLimitText = (t: TFunction, bookId: string, chapterId: string): string =>
  t(`story:${bookId}.momentLimit.${chapterId}.text`);

export const momentOptionText = (t: TFunction, bookId: string, chapterId: string, optionId: string): string =>
  t(`story:${bookId}.momentLimit.${chapterId}.options.${optionId}.text`);

export const momentOptionResultText = (t: TFunction, bookId: string, chapterId: string, optionId: string): string =>
  t(`story:${bookId}.momentLimit.${chapterId}.options.${optionId}.resultText`);

export const dailyActivityTitle = (t: TFunction, activityId: string): string =>
  t(`activities:daily.${activityId}.title`);

export const dailyActivityDescription = (t: TFunction, activityId: string): string =>
  t(`activities:daily.${activityId}.description`);

export const locationActivityFluff = (t: TFunction, activityId: string): string =>
  t(`activities:location.${activityId}.fluff`, {
    defaultValue: t('activities:location.default.fluff'),
  });

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export const locationActivityQuiz = (
  t: TFunction,
  activityId: string,
  answers: number[],
): QuizQuestion[] => {
  const items = t(`activities:location.${activityId}.quiz`, { returnObjects: true }) as unknown;
  if (!Array.isArray(items)) return [];
  return items.map((item: { q: string; options: string[] }, i) => ({
    q: item.q,
    options: item.options,
    correct: answers[i] ?? 0,
  }));
};

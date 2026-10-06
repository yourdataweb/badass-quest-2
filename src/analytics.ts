import i18n from './i18n';
import { useGameStore } from './store/gameStore';

/**
 * Google Analytics 4 wrapper.
 *
 * Enabled only when VITE_GA_MEASUREMENT_ID is set at build time and the app
 * is not running under Cypress. In dev, events are logged to the console
 * instead of being sent.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    Cypress?: unknown;
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const enabled = !!MEASUREMENT_ID && !import.meta.env.DEV && typeof window !== 'undefined' && !window.Cypress;

export function trackEvent(name: string, params: EventParams = {}): void {
  if (import.meta.env.DEV) console.log('[analytics]', name, params);
  if (!enabled || !window.gtag) return;
  window.gtag('event', name, params);
}

function loadGtag(id: string): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js requires the `arguments` object, not a spread array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/** Emit events derived from store transitions, so screens don't need to call trackEvent. */
function subscribeToStore(): void {
  useGameStore.subscribe((state, prev) => {
    const common = { city: state.chosenCity ?? undefined, chapter: state.currentChapter };

    if (state.phase !== prev.phase) {
      // trackEvent('phase_change',{ ...common, phase: state.phase, from_phase: prev.phase });
      if (state.phase === 'epilogue') trackEvent('game_complete', { ...common, character: state.chosenCharacter ?? undefined });
    }

    if (state.chosenCharacter && state.chosenCharacter !== prev.chosenCharacter) {
      trackEvent('game_start', { character: state.chosenCharacter });
    }

    if (state.chosenCity && state.chosenCity !== prev.chosenCity) {
      trackEvent('city_select', { city: state.chosenCity });
    }

    if (state.currentLocationId && state.currentLocationId !== prev.currentLocationId) {
      trackEvent('location_visit', { ...common, location_id: state.currentLocationId });
    }

    if (state.selectedOptionIds.length > prev.selectedOptionIds.length) {
      for (const entry of state.selectedOptionIds.slice(prev.selectedOptionIds.length)) {
        const [chapterId, nodeId, optionId] = entry.split(':');
        trackEvent('dialogue_choice', { ...common, chapter_id: chapterId, node_id: nodeId, option_id: optionId });
      }
    }

    if (state.completedChapterIds.length > prev.completedChapterIds.length) {
      for (const chapterId of state.completedChapterIds.slice(prev.completedChapterIds.length)) {
        trackEvent('chapter_complete', { ...common, chapter_id: chapterId });
      }
    }

    if (state.usedHomeActions.length > prev.usedHomeActions.length) {
      for (const actionId of state.usedHomeActions.slice(prev.usedHomeActions.length)) {
        trackEvent('home_action', { ...common, action_id: actionId });
      }
    }
  });
}

export function initAnalytics(): void {
  if (enabled) loadGtag(MEASUREMENT_ID!);
  subscribeToStore();
  i18n.on('languageChanged', (lng) => trackEvent('language_change', { language: lng }));
}

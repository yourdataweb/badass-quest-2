import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ca from './locales/ca.json';
import es from './locales/es.json';
import en from './locales/en.json';
import citiesCa from './locales/cities/ca.json';
import citiesEs from './locales/cities/es.json';
import citiesEn from './locales/cities/en.json';
import storyCa from './locales/story/ca.json';
import storyEs from './locales/story/es.json';
import storyEn from './locales/story/en.json';
import activitiesCa from './locales/activities/ca.json';
import activitiesEs from './locales/activities/es.json';
import activitiesEn from './locales/activities/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ca: { translation: ca, cities: citiesCa, story: storyCa, activities: activitiesCa },
      es: { translation: es, cities: citiesEs, story: storyEs, activities: activitiesEs },
      en: { translation: en, cities: citiesEn, story: storyEn, activities: activitiesEn },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
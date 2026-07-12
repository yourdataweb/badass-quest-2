import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zh from './locales/zh.json';
import es from './locales/es.json';
import en from './locales/en.json';
import citiesZh from './locales/cities/zh.json';
import citiesEs from './locales/cities/es.json';
import citiesEn from './locales/cities/en.json';
import storyZh from './locales/story/zh.json';
import storyEs from './locales/story/es.json';
import storyEn from './locales/story/en.json';
import activitiesZh from './locales/activities/zh.json';
import activitiesEs from './locales/activities/es.json';
import activitiesEn from './locales/activities/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en, cities: citiesEn, story: storyEn, activities: activitiesEn },
      zh: { translation: zh, cities: citiesZh, story: storyZh, activities: activitiesZh },
      es: { translation: es, cities: citiesEs, story: storyEs, activities: activitiesEs },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
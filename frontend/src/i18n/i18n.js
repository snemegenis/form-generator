import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(LanguageDetector)
.init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "List of Patients": "List of Patients",
        "Add": "Add"
      }
    },
    lt: {
      translations: {
        "List of Patients": "Pacientų sąrašas",
        "Add": "Pridėti"
      }
    }
  },
  lng: 'lt',
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  }
});

export default i18n ;
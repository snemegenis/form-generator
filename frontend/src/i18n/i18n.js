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
        "Add Patient": "Add Patient",
        "Show all": "Show all",
        "Filter": "Filter",
        "Personal id": "Personal id",
        "First name": "First name",
        "Last name": "Last name",
        "Add Disability": "Add Disability",
        "Update Disability": "Update Disability",
        "Update patient": "Update patient",
        "Print": "Print"
      }
    },
    lt: {
      translations: {
        "List of Patients": "Pacientų sąrašas",
        "Add Patient": "Pridėti Pacientą",
        "Show all": "Rodyti visus",
        "Filter": "Filtruoti",
        "Personal id": "Asmens kodas",
        "First name": "Vardas",
        "Last name": "Pavardė",
        "Add Disability": "Pridėti neįgalumą",
        "Update Disability": "Atnaujinti neįgalumą",
        "Update patient": "Atnaujinti pacientą",
        "Print": "Spausdinti"
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
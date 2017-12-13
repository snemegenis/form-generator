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
                    "Print": "Print",
                    "Date of birth": "Date of birth",
                    "Address": "Address",
                    "Occupation": "Occupation",
                    "Phone": "Phone",
                    "Mobile phone": "Mobile phone",
                    "Email": "Email",
                    "Employer": "Employer",
                    "Save": "Save",
                    "Back": "Back",
                    "Enter a valid personal id.": "Enter a valid personal id.",
                    "Enter a valid birth date.": "Enter a valid birth date.",
                    "Enter a first name.": "Enter a first name.",
                    "Enter a last name.": "Enter a last name.",
                    "Enter an occupation.": "Enter an occupation.",
                    "Enter a valid phone.": "Enter a valid phone.",
                    "Enter a valid mobile phone.": "Enter a valid mobile phone.",
                    "Enter an address.": "Enter an address.",
                    "Phone/Mobile phone is required": "Phone/Mobile phone is required"
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
                    "Print": "Spausdinti",
                    "Date of birth": "Gimimo data",
                    "Address": "Adresas",
                    "Occupation": "Profesija",
                    "Phone": "Telefonas",
                    "Mobile phone": "Mobilus telefonas",
                    "Email": "Paštas",
                    "Employer": "Darbovietė",
                    "Save": "Išsaugoti",
                    "Back": "Atgal",
                    "Enter a valid personal id.": "Įveskite teisingą asmens kodą.",
                    "Enter a valid birth date.": "Įveskite tesingą gimimo datą.",
                    "Enter a first name.": "Įveskite vardą.",
                    "Enter a last name.": "Įveskite pavardę.",
                    "Enter an occupation.": "Įveskite profesiją.",
                    "Enter a valid phone.": "Įveskite teisingą telefono numerį",
                    "Enter a valid mobile phone.": "Įveskite teisingą mobilaus telefono numerį",
                    "Enter an address.": "Įveskite adresą",
                    "Phone/Mobile phone is required": "Reikia įvesti arba mobilaus arba paprasto telefono numerį"
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

export default i18n;
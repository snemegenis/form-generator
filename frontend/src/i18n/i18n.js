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
                    "Phone/Mobile phone is required": "Phone/Mobile phone is required",
                    "Logout": "Logout",
                    "Disability saved successfully.": "Disability saved successfully.",
                    "Disability saving error.": "Disability saving error.",
                    "Patients loaded successfully.": "Patients loaded successfully.",
                    "Patients loading error.": "Patients loading error.",
                    "{{username}} logged in successfully.": "{{username}} logged in successfully.",
                    "Login error.": "Login error.",
                    "{{username}} logged out successfully.": "{{username}} logged out successfully.",
                    "Logout error.": "Logout error.",
                    "User authentication info is missing": "User authentication info is missing",
                    "Patient saved successfully.": "Patient saved successfully.",
                    "Patient saving error.": "Patient saving error.",
                    "Patients report generation error.": "Patients report generation error.",
                    "Disability temporary data saved successfully.": "Disability temporary data saved successfully.",
                    "Disability temporary data saving error.": "Disability temporary data saving error.",
                    "Disability temporary data loaded successfully.": "Disability temporary data loaded successfully.",
                    "Disability temporary data loading error.": "Disability temporary data loading error.",
                    "Disability data loaded successfully.": "Disability data loaded successfully.",
                    "Disability data loading error.": "Disability data loading error.",
                    "Username": "Username",
                    "Password": "Password",
                    "Enter an username": "Enter an username",
                    "Enter a password": "Enter a password",
                    "Login form": "Login form",
                    "Login": "Login"
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
                    "Phone/Mobile phone is required": "Reikia įvesti arba mobilaus arba paprasto telefono numerį",
                    "Logout": "Atsijungti",
                    "Disability saved successfully.": "Neįgalumo duomenys išsaugoti sėkmingai.",
                    "Disability saving error.": "Neįgalumo duomenų saugojima klaida.Pabandykite dar kartą. " +
                    "Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
                    "Patients loaded successfully.": "Pacientų sąrašas nuskaitytas sėkmingai.",
                    "Patients loading error.": "Nepavyko nuskaityti pacientų duomenų. Pabandykite dar kartą. " +
                    "Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
                    "{{username}} logged in successfully.": "{{username}} prisijungė sėkmingai.",
                    "Login error.": "Nepavyko prisijungti prie sistemos. Bandykite dar kartą.",
                    "{{username}} logged out successfully.": "{{username}} atsijungė sėkmingai.",
                    "Logout error.": "Nepavyko atsijungti nuo sistemos. Bandykite dar kartą.",
                    "User authentication info is missing": "Prašome prisijungti prie sistemos",
                    "Patient saved successfully.": "Paciento duomenys išsaugoti sėkmingai.",
                    "Patient saving error.": "Paciento duomenų saugojimo klaida. Pabandykite dar kartą. " +
                    "Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
                    "Patients report generation error.": "Neįgalumo formos generavimo klaida. Pabandykite dar kartą. " +
                    "Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
                    "Disability temporary data saved successfully.": "Tarpiniai neįgalumo duomenys išsaugoti sėkmingai",
                    "Disability temporary data saving error.": "Tarpinių neįgalumo duomenų saugojimo klaida. " +
                    "Pabandykite dar kartą. Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
                    "Disability temporary data loaded successfully.": "Tarpiniai neįgalumo duomenys nuskaityti sėkmingai.",
                    "Disability temporary data loading error.": "Tarpinių neįgalumo duomenų nuskaitymo klaida. " +
                    "Pabandykite dar kartą. Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
                    "Disability data loaded successfully.": "Neįgalumo duomenys nuskaityti sėkmingai.",
                    "Disability data loading error.": "Nepavyko nuskaityti neįgalumo duomenų. "+
                    "Pabandykite dar kartą. Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
                    "Username": "Vartotojo vardas",
                    "Password": "Slaptažodis",
                    "Enter an username": "Įveskite vartotojo vardą",
                    "Enter a password": "Įveskite slaptažodį",
                    "Login form": "Prisijungimo forma",
                    "Login": "Prisijungti"
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
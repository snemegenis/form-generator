import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Patient disability manager": "Patient disability manager",
        "Filter by": "Filter by",
        "List of Patients": "List of Patients",
        "Add Patient": "Add Patient",
        "Show all": "Show all",
        "No patients found": "No patients found",
        "Filter": "Filter",
        "Personal id": "Personal id",
        "First name": "First name",
        "Last name": "Last name",
        "Add Disability": "Add Disability",
        "Update Disability": "Update Disability",
        "Update Patient": "Update Patient",
        "Remove Patient": "Remove",
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
        "Patient removed successfully.": "Patient removed successfully.",
        "Patient saving error.": "Patient saving error.",
        "Patient removal error.": "Patient removal error.",
        "Patients report generation error.": "Patients report generation error.",
        "Disability temporary data saved successfully.": "Disability temporary data saved successfully.",
        "Disability temporary data saving error.": "Disability temporary data saving error.",
        "Disability temporary data loaded successfully.": "Disability temporary data loaded successfully.",
        "Disability temporary data loading error.": "Disability temporary data loading error.",
        "Disability data loaded successfully.": "Disability data loaded successfully.",
        "Disability data loading error.": "Disability data loading error.",
        "Username": "Username",
        "Password": "Password",
        "Enter an username.": "Enter an username",
        "Enter a password.": "Enter a password",
        "Login form": "Login form",
        "Login": "Login",
        "Add patient disability": "Add patient disability",
        "Update patient disability": "Update patient disability",
        "History": "History",
        "Treatments": "Treatments",
        "Other treatment": "Other treatment",
        "Ambulatoric": "Ambulatoric",
        "Medicaments": "Medicaments",
        "Stationary": "Stationary",
        "Surgery": "Surgery",
        "Reabilitation": "Reabilitation",
        "Other": "Other",
        "Treatment history": "Treatment history",
        "Appointments": "Appointments",
        "Add appointment": "Add appointment",
        "Appointment {{index}}": "Appointment {{index}}",
        "Date": "Date",
        "Doctor type": "Doctor type",
        "Observation": "Observation",
        "Attachment": "Attachment",
        "Remove appointment": "Remove appointment",
        "Barthel index": "Barthel index",
        "Latest disability description": "Latest disability description",
        "Main diagnosis": "Main diagnosis",
        "Other diagnosis": "Other diagnosis",
        "Other diagnosis {{code}}": "Other diagnosis {{code}}",
        "Add Diagnosis": "Add Diagnosis",
        "Code": "Code",
        "Text": "Text",
        "Functional class": "Functional class",
        "Degree": "Degree",
        "Stage": "Stage",
        "Diagnosis history": "Diagnosis history",
        "Diagnosis details": "Diagnosis details",
        "Remove Diagnosis": "Remove Diagnosis",
        "Disability types": "Disability types",
        "Working Capacity Level": "Working Capacity Level",
        "Disability Level": "Disability Level",
        "First Time": "First Time",
        "Expired": "Expired",
        "Special Requirement": "Special Requirement",
        "Health Condition Changed": "Health Condition Changed",
        "Ordered By Person": "Ordered By Person",
        "Save": "Save",
        "Close": "Close",
        "Cancel": "Cancel",
        "Remove temporary changes": "Remove temporary changes",
        "Enter history.": "Enter history.",
        "Enter other treatment.": "Enter other treatment.",
        "Enter one treatment at least.": "Enter one treatment at least.",
        "Enter one disability at least": "Enter one disability at least",
        "Enter treatment history.": "Enter treatment history.",
        "Enter one appointment at least": "Enter one appointment at least",
        "Enter valid barthel index.": "Enter valid barthel index.",
        "Enter latest disability description.": "Enter latest disability description.",
        "Enter valid code": "Enter valid code",
        "Enter text": "Enter text",
        "Enter functional class": "Enter functional class",
        "Enter degree": "Enter degree",
        "Enter stage": "Enter stage",
        "Enter diagnosis history": "Enter diagnosis history",
        "Enter valid date": "Enter valid date",
        "Enter doctor type": "Enter doctor type",
        "Enter observation": "Enter observation",
        "Data has been changed. Do you really want to quit without saving changes?":
          "Data has been changed. Do you really want to quit without saving changes?",
        "Do you want to remove diagnosis?": "Do you want to remove diagnosis?",
        "Do you want to remove appointment?": "Do you want to remove appointment?",
        "Do you really want to delete patient {{firstName}} {{lastName}} and it's data?":
          "Do you really want to delete patient {{firstName}} {{lastName}}and it's data?",
        "Yes": "Yes",
        "No": "No",
        "Patient {{firstName}} {{lastName}} has temporary changes and these changes will not be reflected. Do you want to continue?":
        "Patient {{firstName}} {{lastName}} has temporary changes and these changes will not be reflected. Do you want to continue?"
      }
    },
    lt: {
      translations: {
        "Patient disability manager": "Pacientų neįgalumo tvarkyklė",
        "Filter by": "Filtruoti",
        "List of Patients": "Pacientų sąrašas",
        "Add Patient": "Pridėti Pacientą",
        "Show all": "Rodyti visus",
        "No patients found": "Pacientų sąrašas tuščias",
        "Filter": "Filtruoti",
        "Personal id": "Asmens kodas",
        "First name": "Vardas",
        "Last name": "Pavardė",
        "Add Disability": "Pridėti neįgalumą",
        "Update Disability": "Atnaujinti neįgalumą",
        "Update Patient": "Atnaujinti Pacientą",
        "Remove Patient": "Pašalinti",
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
        "Patient removed successfully.": "Paciento duomenys pašalinti sėkmingai.",
        "Patient saving error.": "Paciento duomenų saugojimo klaida. Pabandykite dar kartą. " +
        "Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
        "Patient removal error.": "Paciento duomenų šalinimo klaida. Pabandykite dar kartą. " +
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
        "Disability data loading error.": "Nepavyko nuskaityti neįgalumo duomenų. " +
        "Pabandykite dar kartą. Jei klaida kartojasi, kreipkitės į sistemos administratorių.",
        "Username": "Vartotojo vardas",
        "Password": "Slaptažodis",
        "Enter an username.": "Įveskite vartotojo vardą",
        "Enter a password.": "Įveskite slaptažodį",
        "Login form": "Prisijungimo forma",
        "Login": "Prisijungti",
        "Add patient disability": "Pridėti paciento neįgalumą",
        "Update patient disability": "Atnaujinti paciento neįgalumą",
        "History": "Išsami ligos anamnezė",
        "Treatments": "Taikytas gydymas",
        "Other treatment": "Kitas gydymas",
        "Ambulatoric": "Ambulatorinis",
        "Medicaments": "Medikamentinis",
        "Stationary": "Stacionarus",
        "Surgery": "Chirurginis",
        "Reabilitation": "Reabilitacija",
        "Other": "Kitas",
        "Treatment history": "Būklės ir gydymo eigos",
        "Appointments": "Sveikatos būklės aprašymas",
        "Add appointment": "Pridėti naują aprašymą",
        "Appointment {{index}}": "Aprašymas nr. {{index}}",
        "Date": "Konsultacijos data",
        "Doctor type": "Gydytojo specialybė",
        "Observation": "Išliekantys organizmo funkciju sutrikimai, tyrimų duomenys, gydytojų specialistų išvados, patvirtinančios ligos sunkuma ir diagnozę",
        "Attachment": "Priedai (Prisegami)",
        "Remove appointment": "Pašalinti aprašymą",
        "Barthel index": "BARTHEL indeksas",
        "Latest disability description": "Laikinojo nedarbingumo trukmė per paskutinius 12 mėn.",
        "Main diagnosis": "Pagrindinė diagnozė",
        "Other diagnosis": "Kitos diagnozės",
        "Other diagnosis {{code}}": "Kita diagnozė {{code}}",
        "Add Diagnosis": "Pridėti diagnozę",
        "Code": "TLK-10-AM kodas",
        "Text": "Žodžiais",
        "Functional class": "Funkcinė klasė",
        "Degree": "Laipsnis",
        "Stage": "Stadija",
        "Diagnosis history": "Eiga/forma",
        "Diagnosis details": "Papildoma informacija",
        "Remove Diagnosis": "Pašalinti diagnozę",
        "Disability types": "Siunčiamas į Neįgalumo ir darbingumo nustatymo tarnybą",
        "Working Capacity Level": "dėl nedarbingumo lygio nustatymo",
        "First Time": "pirmą kartą",
        "Disability Level": "dėl neįgalumo lygio nustatymo",
        "Expired": "baigiantis terminui",
        "Special Requirement": "dėl specialiųjų poreikių nustatymo",
        "Health Condition Changed": "būklei pasikeitus",
        "Ordered By Person": "asmeniui ar jo atstovui pagal įstatymą reikalaujant",
        "Save": "Išsaugoti",
        "Close": "Uždaryti",
        "Cancel": "Atšaukti pakeitimus",
        "Remove temporary changes": "Atšaukti visus laikinus pakeitimus",
        "Enter history.": "Įveskite išsamią ligos anamnezę",
        "Enter other treatment.": "Įveskite kito gydymo būdą.",
        "Enter one treatment at least.": "Įveskite bent vieną taikyto gydymo būdą.",
        "Enter treatment history.": "Įveskite būklę ir gydymo eigą.",
        "Enter one appointment at least": "Įveskite bent vieną būklės aprašymą.",
        "Enter one disability at least.": "Įveskite bent vieną siuntimo į neįgalumo ir darbingumo nustatymo tarnybą priežastį.",
        "Enter valid barthel index.": "Įveskite tesingą Barthel indekso reikšmę.",
        "Enter latest disability description.": "Įveskite laikinojo nedarbingumo trukmę per paskutinius 12 mėn.",
        "Enter valid code": "Įveskite TLK-10-AM kodą",
        "Enter text": "Įveskite TLK-10-AM kodą žodžiais",
        "Enter functional class": "Įveskite funkcinę klasę",
        "Enter degree": "Įveskite laipsnį",
        "Enter stage": "Įveskite stadiją",
        "Enter diagnosis history": "Įveskite eigą/formą",
        "Enter valid date": "Įveskite teisingą datą",
        "Enter doctor type": "Įveskite gydytojo specialybę",
        "Enter observation": "Įveskite išliekančius organizmo funkciju sutrikimus, tyrimų duomenis, gydytojų specialistų išvadas, patvirtinančias ligos sunkumą ir diagnozę",
        "Data has been changed. Do you really want to quit without saving changes?":
          "Duomenys buvo pakeisti. Ar tikrai norite išeiti neišsaugoję pakeitimų?",
        "Do you want to remove diagnosis?": "Ar tikrai norite pašalinti diagnozę?",
        "Do you want to remove appointment?": "Ar tikrai norite pašalinti aprašymą?",
        "Do you really want to delete patient {{firstName}} {{lastName}} and it's data?":
          "Ar tikrai norite pašalinti pacientą {{firstName}} {{lastName}} ir jo visus duomenis?",
        "Yes": "Taip",
        "No": "Ne",
        "Patient {{firstName}} {{lastName}} has temporary changes and these changes will not be reflected. Do you want to continue?":
        "Laikini paciento {{firstName}} {{lastName}} neįgalumo pakeitimai dar nėra išsaugoti ir nebus spausdinami. Ar norite tęsti?"
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
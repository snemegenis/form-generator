import constants from "./constant";

export const patients = (state = {isLoading: false, isLoadingError: false, data: []}, action) => {
  switch (action.type) {
    case constants.SAVE_DISABILITY_TMP:
    case constants.SAVE_DISABILITY:
    case constants.SAVE_PATIENT:
    case constants.LOAD_PATIENT_LIST:
    case constants.LOAD_DISABILITY_TMP:
      return {
        ...state,
        isLoading: true,
        isLoadingError: false
      };
    case constants.SAVE_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingError: false,
        savedAt: action.savedAt,
        data: [action.patient, ...state.data],
        error: null
      };
    case constants.SAVE_DISABILITY_TMP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingError: false,
        savedAt: action.savedAt,
        data: state.data.map((patient) =>
          patient.id === action.disability.patientId ?
            {
              ...patient,
              tempSaved: true
            } : patient),
        error: null
      };
    case constants.SAVE_DISABILITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingError: false,
        savedAt: action.savedAt,
        data: state.data.map((patient) =>
          patient.id === action.disability.patientId ?
            {
              ...patient,
              disabilityReportId: action.disability.id
            } : patient),
        error: null
      };
    case constants.SAVE_DISABILITY_TMP_ERROR:
    case constants.SAVE_DISABILITY_ERROR:
    case constants.SAVE_PATIENT_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoadingError: true,
        error: action.data
      };
    case constants.LOAD_PATIENT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingError: false,
        data: action.patients,
        loadedAt: action.loadedAt,
        error: null
      };
    case constants.LOAD_PATIENT_LIST_ERROR:
      return {
        ...state,
        data: [],
        isDisabilityLoading: false,
        isDisabilityLoadingError: true,
        error: action.data,
      };
    case constants.LOAD_DISABILITY_TMP_SUCCESS:
      return {
        ...state,
        isDisabilityLoading: false,
        isDisabilityLoadingError: false,
        loadedAt: action.loadedAt,
        activeDisability: action.disability,
        error: null
      };
    case constants.LOAD_DISABILITY_TMP_ERROR:
      return {
        ...state,
        isDisabilityLoading: false,
        isDisabilityLoadingError: true,
        activeDisability: null,
        error: action.data,
      };
    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case constants.LOGIN:
      return {
        id: action.id,
        username: action.username
      };
    default:
      return state;
  }
};
import constants from "./constant";
import {sortByField} from "../util/SortUtil"

export const patients = (state = {isProcessing: false, isProcessingError: false, data: [], activePatient: {}}, action) => {
  switch (action.type) {
    case constants.SHOW_ALL_PATIENT_LIST:
      return {
        ...state,
        filter: null,
      };
    case constants.FILTER_PATIENT_LIST:
      return {
        ...state,
        filter: action.filter,
      };
    case constants.SAVE_DISABILITY_TMP:
    case constants.SAVE_DISABILITY:
    case constants.SAVE_PATIENT:
    case constants.LOAD_PATIENT_LIST:
    case constants.REMOVE_PATIENT:
      return {
        ...state,
        isProcessing: true,
        isProcessingError: false
      };
    case constants.REMOVE_PATIENT_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: false,
        data: state.data.filter(patient => patient.id !== action.patientId),
        error: null
      };
    case constants.SAVE_PATIENT_SUCCESS:
      let new_data = [action.patient, ...state.data.filter(patient => patient.id !== action.patient.id)];
      return {
        ...state,
        isProcessing: false,
        isProcessingError: false,
        savedAt: action.savedAt,
        data: new_data.sort((p1, p2) => {
          let result = sortByField(p1, p2, "firstName");
          if (!result) {
            result = sortByField(p1, p2, "lastName");
          }
          return result;
        }),
        error: null
      };
    case constants.SAVE_DISABILITY_TMP_SUCCESS:
      return {
        ...state,
        activeDisability: action.disability,
        isProcessing: false,
        isProcessingError: false,
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
        activeDisability: null,
        isProcessing: false,
        isProcessingError: false,
        savedAt: action.savedAt,
        data: state.data.map((patient) =>
          patient.id === action.disability.patientId ?
            {
              ...patient,
              disabilityReportId: action.disability.id,
              tempSaved: false
            } : patient),
        error: null
      };
    case constants.REMOVE_PATIENT_ERROR:
    case constants.SAVE_PATIENT_ERROR:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: true,
        error: action.data
      };
    case constants.SAVE_DISABILITY_TMP_ERROR:
    case constants.SAVE_DISABILITY_ERROR:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: true,
        error: action.data
      };
    case constants.LOAD_PATIENT_LIST_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: false,
        data: action.patients,
        loadedAt: action.loadedAt,
        error: null
      };
    case constants.LOAD_PATIENT_LIST_ERROR:
      return {
        ...state,
        data: [],
        isProcessing: false,
        isProcessingError: true,
        error: action.data,
      };
    case constants.LOAD_DISABILITY:
    case constants.LOAD_DISABILITY_TMP:
      return {
        ...state,
        activeDisability: null,
        isProcessing: true,
        isProcessingError: false
      };

    case constants.CANCEL_DISABILITY:
      return {
        ...state,
        activeDisability: null,
      };

    case constants.LOAD_DISABILITY_TMP_SUCCESS:
    case constants.LOAD_DISABILITY_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: false,
        loadedAt: action.loadedAt,
        activeDisability: action.disability,
        error: null
      };
    case constants.LOAD_DISABILITY_TMP_ERROR:
    case constants.LOAD_DISABILITY_ERROR:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: true,
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
        ...state,
        isProcessing: true,
        isProcessingError: false,
        username: null,
        doctor: null,
        token: null,
        isAuthenticated: false
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: false,
        username: action.user.credentials.username,
        doctor: action.user.doctor,
        isAuthenticated: true,
        token: action.user.token
      };
    case constants.LOGIN_FAILURE:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: true,
        username: null,
        doctor: null,
        token: null
      };
    case constants.LOGOUT:
      return {
        ...state,
        isProcessing: true,
        isProcessingError: false
      };
    case constants.LOGOUT_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: false,
        isAuthenticated: false,
        username: null,
        doctor: null,
        token: null
      };
    case constants.LOGOUT_FAILURE:
      return {
        ...state,
        isProcessing: false,
        isProcessingError: true
      };
    case constants.AUTHENTICATION_ERROR:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
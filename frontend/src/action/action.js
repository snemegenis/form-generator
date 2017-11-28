import constants from "./constant";
import PatientApi from "../api/patient-api"
import DisabilityApi from "../api/disability-api"
import ReportApi from "../api/report-api"
import {addNotification as notify} from 'reapop';
import {hashHistory} from 'react-router'

let fileDownload = require("react-file-download");

const loadPatients = (doctorId) => ({
  type: constants.LOAD_PATIENT_LIST
});

const printPatient = (patientId) => ({
  type: constants.PRINT_PATIENT,
  patientId
});

const savePatient = (doctorId, patient) => ({
  type: constants.SAVE_PATIENT,
  doctorId,
  patient
});

export const savePatientAction = (patient) => dispatch => {
  dispatch(savePatient(patient));
  return PatientApi.save(patient).then(
    response => {
      dispatch(savePatientSuccessAction(response.body));
      dispatch(notify({message: "Patient saved successfully.", status: 200, position: 'tc'}));
      hashHistory.push('/');
    },
    error => {
      dispatch(savePatientErrorAction(error));
      dispatch(notify({message: "Patient saving error.", status: 500, position: 'tc'}));
    });

};

export const savePatientErrorAction = (patient, error) => ({
  type: constants.SAVE_PATIENT_ERROR,
  error,
  patient
});

export const savePatientSuccessAction = (patient) => ({
  type: constants.SAVE_PATIENT_SUCCESS,
  patient,
  updatedAt: Date.now(),
});

export const loadPatientsAction = () => dispatch => {
  dispatch(loadPatients());
  return PatientApi.load().then(
    response => {
      dispatch(notify({message: "Patients loaded successfully.", status: 200, position: 'tc'}));
      dispatch(loadPatientsSuccessAction(response.body))
    },
    error => {
      console.log(error);
      dispatch(notify({message: "Patients loading error.", status: 500, position: 'tc'}));
      dispatch(loadPatientsErrorAction(error));
    });

};

export const printPatientAction = (patientId, patientFirstName, patientLastName) => dispatch => {
  dispatch(printPatient(patientId));
  return ReportApi.print(patientId).then(
    response => {
      fileDownload(response.body, patientFirstName + "_" + patientLastName + ".pdf");
      dispatch(printPatientSuccessAction(patientId, response.body));
    }
  );
};

export const printPatientSuccessAction = (patientId, data) => ({
  type: constants.PRINT_PATIENT_SUCCESS,
  patientId,
  data
});

export const loadPatientsErrorAction = (error) => ({
  type: constants.LOAD_PATIENT_LIST_ERROR,
  error
});

export const loadPatientsSuccessAction = (patients) => ({
  type: constants.LOAD_PATIENT_LIST_SUCCESS,
  patients: patients ? patients : [],
  loadedAt: Date.now()
});

const saveDisability = (disability) => ({
  type: constants.SAVE_DISABILITY,
  disability
});

export const saveDisabilityErrorAction = (disability, error) => ({
  type: constants.SAVE_DISABILITY_ERROR,
  error,
  disability
});

export const saveDisabilitySuccessAction = (disability) => ({
  type: constants.SAVE_DISABILITY_SUCCESS,
  disability,
  updatedAt: Date.now(),
});

export const saveDisabilityAction = (disability) => dispatch => {
  dispatch(saveDisability(disability));
  return DisabilityApi.add(disability).then(
    response => {
      dispatch(actions.reset('forms.activeDisability'));
      dispatch(saveDisabilitySuccessAction(response.body));
      dispatch(notify({message: "Disability saved successfully.", status: 200, position: 'tc'}));
      hashHistory.push('/');

    },
    error => {
      dispatch(actions.reset('forms.activeDisability'));
      dispatch(saveDisabilityErrorAction(error));
      dispatch(notify({message: "Disability saving error.", status: 500, position: 'tc'}));
    });

};

const saveDisabilityTmp = (disability) => ({
  type: constants.SAVE_DISABILITY_TMP,
  disability
});

export const saveDisabilityTmpErrorAction = (disability, error) => ({
  type: constants.SAVE_DISABILITY_TMP_ERROR,
  error,
  disability
});

export const saveDisabilityTmpSuccessAction = (disability) => ({
  type: constants.SAVE_DISABILITY_TMP_SUCCESS,
  disability,
  updatedAt: Date.now(),
});

export const saveDisabilityTmpAction = (disability, closeOnSuccess) => dispatch => {
  dispatch(saveDisabilityTmp(disability));
  return DisabilityApi.saveTmp(disability).then(
    response => {
      dispatch(saveDisabilityTmpSuccessAction(response.body));
      dispatch(notify({message: "Disability temporary data saved successfully.", status: 200, position: 'tc'}));
      if (closeOnSuccess) {
        hashHistory.push('/');
      }
    },
    error => {
      dispatch(saveDisabilityTmpErrorAction(error));
      dispatch(notify({message: "Disability temporary data saving error.", status: 500, position: 'tc'}));
    });

};

const loadDisabilityTmp = (patientId) => ({
  type: constants.LOAD_DISABILITY_TMP,
  patientId
});

export const loadDisabilityTmpErrorAction = (patientId, error) => ({
  type: constants.LOAD_DISABILITY_TMP_ERROR,
  error,
  patientId
});

export const loadDisabilityTmpSuccessAction = (disability) => ({
  type: constants.LOAD_DISABILITY_TMP_SUCCESS,
  disability,
  loadedAt: Date.now(),
});

export const loadDisabilityTmpAction = (patientId, nextPageURL) => dispatch => {
  dispatch(loadDisabilityTmp(patientId));
  return DisabilityApi.loadTmp(patientId).then(
    response => {
      dispatch(loadDisabilityTmpSuccessAction(response.body));
      dispatch(notify({message: "Disability temporary data loaded successfully.", status: 200, position: 'tc'}));
      hashHistory.push(nextPageURL);
    },
    error => {
      dispatch(loadDisabilityTmpErrorAction(patientId, error));
      dispatch(notify({message: "Disability temporary data loading error.", status: 500, position: 'tc'}));
    });
};

export const cancelDisability = () => ({
  type: constants.CANCEL_DISABILITY
});

const loadDisability = (patientId, disabilityId) => ({
  type: constants.LOAD_DISABILITY,
  patientId,
  disabilityId
});

export const loadDisabilityErrorAction = (patientId, disabilityId, error) => ({
  type: constants.LOAD_DISABILITY_ERROR,
  error,
  patientId,
  disabilityId
});

export const loadDisabilitySuccessAction = (disability) => ({
  type: constants.LOAD_DISABILITY_SUCCESS,
  disability,
  loadedAt: Date.now(),
});

export const loadDisabilityAction = (patientId, disabilityId, nextPageURL) => dispatch => {
  dispatch(loadDisability(disabilityId));
  return DisabilityApi.load(patientId, disabilityId).then(
    response => {
      dispatch(loadDisabilitySuccessAction(response.body));
      dispatch(notify({message: "Disability data loaded successfully.", status: 200, position: 'tc'}));
      hashHistory.push(nextPageURL);
    },
    error => {
      dispatch(loadDisabilityErrorAction(patientId, disabilityId, error));
      dispatch(notify({message: "Disability data loading error.", status: 500, position: 'tc'}));
    });
};

export const loginAction = (username, password) => ({
  type: constants.LOGIN,
  id: 1,
  username,
  password
});

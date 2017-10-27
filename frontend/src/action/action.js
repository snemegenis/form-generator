import constants from "./constant";
import PatientApi from "../api/patient-api"
import ReportApi from "../api/report-api"
import {addNotification as notify} from 'reapop';
import {actions} from "react-redux-form";

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
      dispatch(actions.reset('patients.activePatient'));
      dispatch(savePatientSuccessAction(response.body));
      dispatch(notify({message: "Patient saved successfully.", status: 200, position: 'tc'}));
    },
    error => {
      dispatch(actions.reset('patients.activePatient'));
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
  return PatientApi.save(patient).then(
    response => {
      dispatch(actions.reset('patients.activePatient'));
      dispatch(savePatientSuccessAction(response.body));
      dispatch(notify({message: "Patient saved successfully.", status: 200, position: 'tc'}));
    },
    error => {
      dispatch(actions.reset('patients.activePatient'));
      dispatch(savePatientErrorAction(error));
      dispatch(notify({message: "Patient saving error.", status: 500, position: 'tc'}));
    });

};

export const loginAction = (username, password) => ({
  type: constants.LOGIN,
  id: 1,
  username,
  password
});

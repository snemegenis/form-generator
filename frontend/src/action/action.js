import constants from "./constant";
import PatientApi from "../api/patient-api"
import ReportApi from "../api/report-api"

let fileDownload = require("react-file-download");

const loadPatients = (doctorId) => ({
    type: constants.LOAD_PATIENT_LIST,
    doctorId
});

const printPatient = (patientId) => ({
    type: constants.PRINT_PATIENT,
    patientId
});

export const loadPatientsAction = (doctorId) => dispatch => {
    dispatch(loadPatients(doctorId));
    return PatientApi.load(doctorId).then(
            response => dispatch(loadPatientsSuccessAction(doctorId, response.body)),
            error => {
                console.log(error);
                dispatch(loadPatientsErrorAction(doctorId, error));
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

export const loadPatientsErrorAction = (doctorId, error) => ({
    type: constants.LOAD_PATIENT_LIST_ERROR,
    error,
    doctorId
});

export const loadPatientsSuccessAction = (doctorId, patients) => ({
    type: constants.LOAD_PATIENT_LIST_SUCCESS,
    patients: patients ? patients : [],
    loadedAt: Date.now(),
    doctorId
});

export const addPatientAction = (doctorId, error) => ({
  type: constants.LOAD_PATIENT_LIST_ERROR,
  error,
  doctorId
});

export const loginAction = (username, password) => ({
    type: constants.LOGIN,
    id: 1,
    username,
    password
});

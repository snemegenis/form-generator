import request from "superagent";
import constants from "./constant";
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
    return request.post('http://localhost:8090/form/rest/v1/patient/list')
        .send({doctorId}).then(
            response => {
                setTimeout(() => {
                    console.log('Data received: ', response);
                    dispatch(loadPatientsSuccessAction(doctorId, response.body));
                }, 2000);
            },
            error => {
                console.log('error occurred: ', error);
                dispatch(loadPatientsErrorAction(doctorId, error));
            });

};

export const printPatientAction = (patientId, patientFirstName, patientLastName) => dispatch => {
    dispatch(printPatient(patientId));
    return request.post('http://localhost:8090/form/rest/v1/report/disability').responseType('blob')
        .send({patientId}).then(
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

export const loginAction = (username, password) => ({
    type: constants.LOGIN,
    id: 1,
    username,
    password
});
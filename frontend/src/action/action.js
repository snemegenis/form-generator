import constants from "./constant";
import PatientApi from "../api/patient-api"
import DisabilityApi from "../api/disability-api"
import ReportApi from "../api/report-api"
import AuthApi from "../api/auth-api"
import {addNotification as notify} from 'reapop';
import {hashHistory} from 'react-router'
import i18n from "../i18n/i18n";
import {initialize} from "redux-form"
import moment from "moment";

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

export const showAllPatientListAction = () => ({
    type: constants.SHOW_ALL_PATIENT_LIST
});

export const filterPatientListAction = (filter) => ({
    type: constants.FILTER_PATIENT_LIST,
    filter
});

export const savePatientAction = (patient) => dispatch => {
    dispatch(savePatient(patient));
    return PatientApi.save(patient).then(
        response => {
            dispatch(savePatientSuccessAction(response.data));
            dispatch(notify({message: i18n.t("Patient saved successfully."), status: 200, position: 'tc'}));
            hashHistory.push('/');
        },
        error => {
            dispatch(savePatientErrorAction(error));
            dispatch(notify({message: i18n.t("Patient saving error."), status: 500, position: 'tc'}));
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

export const loadPatientsAction = () => (dispatch, getState) => {
    dispatch(loadPatients());
    return PatientApi.load().then(
        response => {
            dispatch(notify({message: i18n.t("Patients loaded successfully."), status: 200, position: 'tc'}));
            dispatch(loadPatientsSuccessAction(response.data));
        },
        error => {
            if (getState().user.isAuthenticated) {
                dispatch(notify({message: i18n.t("Patients loading error."), status: 500, position: 'tc'}));
            }
            dispatch(loadPatientsErrorAction(error));
        });

};

export const printPatientAction = (patientId, patientFirstName, patientLastName) => (dispatch, getState) => {
    dispatch(printPatient(patientId));
    return ReportApi.print(patientId).then(
        response => {
            fileDownload(response.data, patientFirstName + "_" + patientLastName + "_"+
              moment().format("YYYYMMDDhhmm")+".pdf");
            dispatch(printPatientSuccessAction(patientId, response.data));
        },
        error => {
            if (getState().user.isAuthenticated) {
                dispatch(notify({message: i18n.t("Patients report generation error."), status: 500, position: 'tc'}));
            }
        });
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

export const saveDisabilityAction = (disability) => (dispatch, getState) => {
    dispatch(saveDisability(disability));
    return DisabilityApi.add(disability).then(
        response => {
            dispatch(saveDisabilitySuccessAction(response.data));
            dispatch(notify({message: i18n.t("Disability saved successfully."), status: 200, position: 'tc'}));
            hashHistory.push('/');

        },
        error => {
            dispatch(saveDisabilityErrorAction(error));
            if (getState().user.isAuthenticated) {
                dispatch(notify({message: i18n.t("Disability saving error."), status: 500, position: 'tc'}));
            }
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

export const saveDisabilityTmpAction = (disability, closeOnSuccess) => (dispatch, getState) => {
    dispatch(saveDisabilityTmp(disability));
    return DisabilityApi.saveTmp(disability).then(
        response => {
            dispatch(saveDisabilityTmpSuccessAction(response.data));
            dispatch(notify({
                message: i18n.t("Disability temporary data saved successfully."),
                status: 200,
                position: 'tc'
            }));
            if (closeOnSuccess) {
                dispatch(cancelDisability());
                hashHistory.push('/');
            } else {
              dispatch(initialize("activeDisability", disability));
            }
        },
        error => {
            dispatch(saveDisabilityTmpErrorAction(error));
            if (getState().user.isAuthenticated) {
                dispatch(notify({
                    message: i18n.t("Disability temporary data saving error."),
                    status: 500,
                    position: 'tc'
                }));
            }
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

export const loadDisabilityTmpAction = (patientId, nextPageURL) => (dispatch, getState) => {
    dispatch(loadDisabilityTmp(patientId));
    return DisabilityApi.loadTmp(patientId).then(
        response => {
            dispatch(loadDisabilityTmpSuccessAction(response.data));
            dispatch(notify({
                message: i18n.t("Disability temporary data loaded successfully."),
                status: 200,
                position: 'tc'
            }));
            hashHistory.push(nextPageURL);
        },
        error => {
            dispatch(loadDisabilityTmpErrorAction(patientId, error));
            if (getState().user.isAuthenticated) {
                dispatch(notify({
                    message: i18n.t("Disability temporary data loading error."),
                    status: 500,
                    position: 'tc'
                }));
            }
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

export const loadDisabilityAction = (patientId, disabilityId, nextPageURL) => (dispatch, getState) => {
    dispatch(loadDisability(disabilityId));
    return DisabilityApi.load(patientId, disabilityId).then(
        response => {
            dispatch(loadDisabilitySuccessAction(response.data));
            dispatch(notify({message: i18n.t("Disability data loaded successfully."), status: 200, position: 'tc'}));
            hashHistory.push(nextPageURL);
        },
        error => {
            dispatch(loadDisabilityErrorAction(patientId, disabilityId, error));
            if (getState().user.isAuthenticated) {
                dispatch(notify({message: i18n.t("Disability data loading error."), status: 500, position: 'tc'}));
            }
        });
};

const login = () => ({
    type: constants.LOGIN
});

export const loginErrorAction = (error) => ({
    type: constants.LOGIN_FAILURE,
    error
});

export const loginSuccessAction = (user) => ({
    type: constants.LOGIN_SUCCESS,
    user,
    loggedInAt: Date.now(),
});

export const loginAction = (credentials) => dispatch => {
    dispatch(login(credentials));
    return AuthApi.login(credentials.username, credentials.password).then(
        response => {
            let user = response.data;
            dispatch(loginSuccessAction(user));
            dispatch(notify({
                message: i18n.t("{{username}} logged in successfully.", {"username": user.credentials.username}),
                status: 200,
                position: 'tc'
            }));
            localStorage.setItem('auth-token', user.token);
            dispatch(loadPatientsAction());
            hashHistory.push("/");
        },
        error => {
            dispatch(loginErrorAction(error));
            dispatch(notify({message: i18n.t("Login error."), status: 500, position: 'tc'}));
        });
};

const authenticationError = () => ({
    type: constants.AUTHENTICATION_ERROR,
});

export function redirectToLoginWithMessage(messageKey) {
    return (dispatch, getState) => {
        const currentPath = getState().routing.locationBeforeTransitions.pathname;
        dispatch(notify({message: messageKey, status: 403, position: 'tc'}));
        hashHistory.replace({pathname: '/login', state: {nextPathname: currentPath}});
        dispatch(authenticationError());
    }
}

const logout = () => ({
    type: constants.LOGOUT
});

export const logoutErrorAction = (error) => ({
    type: constants.LOGOUT_FAILURE,
    error
});

export const logoutSuccessAction = () => ({
    type: constants.LOGOUT_SUCCESS,
});

export const logoutAction = () => (dispatch, getState) => {
    dispatch(logout());
    return AuthApi.logout().then(
        () => {
            let user = getState().user;
            dispatch(notify({
                message: i18n.t("{{username}} logged out successfully.", {
                    "username": user.username
                }), status: 200, position: 'tc'
            }));
            localStorage.removeItem('auth-token');
            hashHistory.push('/login');
            dispatch(logoutSuccessAction());
        },
        error => {
            dispatch(logoutErrorAction(error));
            dispatch(notify({message: i18n.t("Logout error."), status: 500, position: 'tc'}));
        });
};

export const authenticateAction = () => dispatch => {
    return AuthApi.status().then(
        (response) => {
            let user = response.data;
            localStorage.setItem('auth-token', user.token);
            dispatch(loginSuccessAction(user));
            dispatch(loadPatientsAction());
          hashHistory.push('/');
        },
        () => {
            dispatch(redirectToLoginWithMessage(i18n.t("User authentication info is missing")));
        });
};

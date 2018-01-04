import PatientList from "../ui/PatientList.jsx";
import {
  cancelDisability,
  filterPatientListAction,
  loadDisabilityAction,
  loadDisabilityTmpAction,
  loginAction,
  logoutAction,
  printPatientAction, removePatientAction,
  saveDisabilityAction,
  saveDisabilityTmpAction,
  savePatientAction,
  showAllPatientListAction
} from "../../action/action";
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {formValueSelector, reduxForm, submit} from "redux-form";
import PatientForm from "../ui/PatientForm.jsx";
import DisabilityForm from "../ui/DisabilityForm.jsx";
import LoginForm from "../ui/LoginForm.jsx";
import UserInfo from "../ui/UserInfo.jsx";
import {translate} from "react-i18next";
import {showConfirmation} from "../../util/ConfirmationUtil";

const prepareDisability = (dispatch, patientId, disabilityReportId, tempSaved, nextPageURL) => {
  if (tempSaved) {
    dispatch(loadDisabilityTmpAction(patientId, nextPageURL));
  } else if (disabilityReportId) {
    dispatch(loadDisabilityAction(patientId, disabilityReportId, nextPageURL));
  } else {
    hashHistory.push(nextPageURL);
  }
};

const Login = translate()(connect(state => ({
    user: state.user
  }),
  (dispatch) => ({
    onLogin(credentials) {
      dispatch(loginAction(credentials));
    }
  })
)(reduxForm({form: 'login'})(LoginForm)));

const UserInfoView = connect(state => ({
    user: state.user
  }),
  (dispatch) => ({
    onLogout() {
      dispatch(logoutAction());
    }
  })
)(UserInfo);

const VisiblePatients = translate()(connect(state => ({
    patients: state.patients.data,
    loading: state.patients.isLoading,
    filter: state.patients.filter
  }),
  (dispatch) => ({
    onShowAll() {
      dispatch(showAllPatientListAction());
    },
    onFilter(filter) {
      dispatch(filterPatientListAction(filter));
    },
    onPrint(id, firstName, lastName) {
      dispatch(printPatientAction(id, firstName, lastName));
    },
    onAdd() {
      hashHistory.push('/patient/add');
    },
    onDisabilityAdd(patientId, disabilityReportId, tempSaved) {
      prepareDisability(dispatch, patientId, disabilityReportId, tempSaved, `/patient/${patientId}/disability/add`);
    },
    onDisabilityUpdate(patientId, disabilityReportId, tempSaved) {
      prepareDisability(dispatch, patientId, disabilityReportId, tempSaved,
        `/patient/${patientId}/disability/${disabilityReportId}/update`);
    },
    onUpdate(patientId) {
      hashHistory.push(`/patient/${patientId}/update`);
    },
    onRemove(patientId) {
      showConfirmation(dispatch, "Do you really want to delete patient and it's data?", false,
        () => {
          dispatch(removePatientAction(patientId));
        }, true);

    }
  })
)(PatientList));

const loadAddInitialPatientValues = (state, ownProps) => {
  if (ownProps.patientId) {
    return {
      ...state.patients.data.find(patient => ownProps.patientId == patient.id)
    }
  } else {
    return {};
  }
};

const ModifyPatient = translate()(connect(
  (state, ownProps) => ({
    initialValues: loadAddInitialPatientValues(state, ownProps)
  }),
  (dispatch) => ({
    onPrint(patient) {
      dispatch(savePatientAction(patient));
    },
    onSave(patient) {
      dispatch(savePatientAction(patient));
    },
    onBack(e, changed) {
      e.preventDefault();
      if (changed) {
        showConfirmation(dispatch, "Data has been changed. Do you really want to quit without saving changes?", false,
          () => {
            hashHistory.push('/');
          }, true);
      } else {
        hashHistory.push('/');
      }
    }
  })
)(reduxForm({form: 'activePatient'})(PatientForm)));

const activeDisabilitySelector = formValueSelector('activeDisability');

const loadAddInitialDisabilityValues = (state, ownProps) => {
  if (state.patients.activeDisability) {
    return {...state.patients.activeDisability};
  } else
    return {
      patientId: ownProps.patientId,
      treatments: [],
      mainDiagnosis: {primary: true},
      otherDiagnosis: []
    }
};

const ModifyDisability = translate()(connect(
  (state, ownProps) => ({
    initialValues: loadAddInitialDisabilityValues(state, ownProps),
    treatmentSelected: activeDisabilitySelector(state, 'treatments'),
    otherDiagnosisAssigned: activeDisabilitySelector(state, 'otherDiagnosis'),
    disabilityReportId: ownProps.disabilityReportId
  }),
  dispatch => ({
    onAutoSaveTmpTimeout() {
      dispatch(submit("activeDisability"));
    },
    onAutoSaveTmp(disability) {
      console.log('disability: ', disability);
      dispatch(saveDisabilityTmpAction(disability, false));
    },
    onSaveTmp(disability) {
      console.log('disability: ', disability);
      dispatch(saveDisabilityTmpAction(disability, true));
    },
    onRemoveDiagnosis(removeAction) {
      showConfirmation(dispatch, "Do you want to remove diagnosis?", false, removeAction, true);
    },
    onRemoveAppointment(removeAction) {
      showConfirmation(dispatch, "Do you want to remove appointment?", false, removeAction, true);
    },
    onSave(disability) {
      console.log('disability: ', disability);
      dispatch(saveDisabilityAction(disability));
    },
    onBack(e, changed) {
      e.preventDefault();
      if (changed) {
        showConfirmation(dispatch, "Data has been changed. Do you really want to quit without saving changes?", false,
          () => {
            dispatch(cancelDisability("activeDisability"));
            hashHistory.push('/');
          }, true);
      } else {
        dispatch(cancelDisability("activeDisability"));
        hashHistory.push('/');
      }
    }
  })
)(reduxForm({form: 'activeDisability'})(DisabilityForm)));

export {
  VisiblePatients,
  ModifyDisability,
  ModifyPatient,
  Login,
  UserInfoView
};

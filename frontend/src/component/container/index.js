import PatientList from "../ui/PatientList.jsx";
import {
  cancelDisability, filterPatientListAction,
  loadDisabilityAction,
  loadDisabilityTmpAction, loginAction, logoutAction,
  printPatientAction, saveDisabilityAction, saveDisabilityTmpAction,
  savePatientAction, shoAllPatientListAction, showAllPatientListAction
} from "../../action/action";
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {formValueSelector, reduxForm, submit} from "redux-form";
import PatientForm from "../ui/PatientForm.jsx";
import DisabilityForm from "../ui/DisabilityForm.jsx";
import LoginForm from "../ui/LoginForm.jsx";
import UserInfo from "../ui/UserInfo.jsx";

const prepareDisability = (dispatch, patientId, disabilityReportId, tempSaved, nextPageURL) => {
  if (tempSaved) {
    dispatch(loadDisabilityTmpAction(patientId, nextPageURL));
  } else if (disabilityReportId) {
    dispatch(loadDisabilityAction(patientId, disabilityReportId, nextPageURL));
  } else {
    hashHistory.push(nextPageURL);
  }
};

const Login = connect(state => ({
    user: state.user
  }),
  (dispatch) => ({
    onLogin(credentials) {
      dispatch(loginAction(credentials));
    }
  })
)(reduxForm({form: 'login'})(LoginForm));

const UserInfoView = connect(state => ({
    user: state.user
  }),
  (dispatch) => ({
    onLogout() {
      dispatch(logoutAction());
    }
  })
)(UserInfo);

const VisiblePatients = connect(state => ({
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
    }
  })
)(PatientList);

const loadAddInitialPatientValues = (state, ownProps) => {
  if (ownProps.patientId) {
    return {
      ...state.patients.data.find(patient => ownProps.patientId == patient.id)
    }
  } else {
    return {};
  }
};

const ModifyPatient = connect(
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
    onBack() {
      hashHistory.push('/');
    }
  })
)(reduxForm({form: 'activePatient'})(PatientForm));

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

const ModifyDisability = connect(
  (state, ownProps) => ({
    initialValues: loadAddInitialDisabilityValues(state, ownProps),
    treatmentSelected: activeDisabilitySelector(state, 'treatments'),
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
    onSave(disability) {
      console.log('disability: ', disability);
      dispatch(saveDisabilityAction(disability));
    },
    onBack() {
      dispatch(cancelDisability("activeDisability"));
      hashHistory.push('/');
    }
  })
)(reduxForm({form: 'activeDisability'})(DisabilityForm));

export {
  VisiblePatients,
  ModifyDisability,
  ModifyPatient,
  Login,
  UserInfoView
};

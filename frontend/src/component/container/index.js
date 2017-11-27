import PatientList from "../ui/PatientList.jsx";
import {
  cancelDisability,
  loadDisabilityAction,
  loadDisabilityTmpAction,
  printPatientAction, saveDisabilityAction, saveDisabilityTmpAction,
  savePatientAction
} from "../../action/action";
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {formValueSelector, reduxForm, submit, reset} from "redux-form";
import PatientForm from "../ui/PatientForm.jsx";
import DisabilityForm from "../ui/DisabilityForm.jsx";

const VisiblePatients = connect(state => ({
    patients: state.patients.data,
    loading: state.patients.isLoading
  }),
  (dispatch) => ({
    onPrint(id, firstName, lastName) {
      dispatch(printPatientAction(id, firstName, lastName));
    },
    onAdd() {
      hashHistory.push('/patient/add');
    },
    onDisabilityAdd(patientId, disabilityReportId, tempSaved) {
      if (tempSaved) {
        dispatch(loadDisabilityTmpAction(patientId));
      } else if (disabilityReportId) {
        dispatch(loadDisabilityAction(patientId, disabilityReportId));
      } else {
        hashHistory.push(`/patient/${patientId}/disability/add`);
      }
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
    treatmentSelected: activeDisabilitySelector(state, 'treatments')
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
  ModifyPatient
};

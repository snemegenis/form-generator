import PatientList from "../ui/PatientList.jsx";
import PatientForm from "../ui/PatientForm.jsx";
import {printPatientAction, saveDisabilityAction, savePatientAction} from "../../action/action";
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {actions} from "react-redux-form";
import {formValueSelector, reduxForm} from "redux-form";
import PatientReduxForm from "../ui/PatientReduxForm.jsx";
import DisabilityReduxForm from "../ui/DisabilityReduxForm.jsx";

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
    onDisabilityAdd(patientId) {
      hashHistory.push(`/patient/${patientId}/disability/add`);
    },
    onUpdate(patientId) {
      hashHistory.push(`/patient/${patientId}/update`);
    }
  })
)(PatientList);

const AddPatient = connect(state => state,
  (dispatch, dispatchProps) => ({
    onSave(patient) {
      dispatch(savePatientAction(patient));
      hashHistory.push('/');
    },
    onBack() {
      dispatch(actions.reset("patients.activePatient"));
      hashHistory.push('/');
    }
  })
)(PatientForm);

const AddReduxPatient = connect(null,
  (dispatch) => ({
    onPrint(patient) {
      dispatch(savePatientAction(patient));
    },
    onSave(patient) {
      dispatch(savePatientAction(patient));
      hashHistory.push('/');
    },
    onBack() {
      hashHistory.push('/');
    }
  })
)(reduxForm({form: 'activePatient'})(PatientReduxForm));

const UpdateReduxPatient = connect(
  (state, ownProps) => {
    return {
      initialValues: {
        ...state.patients.data.find(patient => ownProps.patientId == patient.id)
      }
    }
  },
  (dispatch) => ({
    onPrint(patient) {
      dispatch(savePatientAction(patient));
    },
    onSave(patient) {
      dispatch(savePatientAction(patient));
      hashHistory.push('/');
    },
    onBack() {
      hashHistory.push('/');
    }
  })
)(reduxForm({form: 'activePatient'})(PatientReduxForm));

const activeDisabilitySelector = formValueSelector('activeDisability');

const AddDisability = connect(
  (state, ownProps) => ({
    initialValues: {
      patient: {id: ownProps.patientId},
      treatments: [],
      mainDiagnosis: {primary: true},
      otherDiagnosis: []
    },
    treatmentSelected: activeDisabilitySelector(state, 'treatments')
  }),
  dispatch => ({
    onSave(disability) {
      console.log('disability: ', disability);
      dispatch(saveDisabilityAction(disability));
      hashHistory.push('/');
    },
    onBack() {
      hashHistory.push('/');
    }
  })
)(reduxForm({form: 'activeDisability'})(DisabilityReduxForm));

export {
  VisiblePatients,
  AddPatient,
  AddDisability,
  AddReduxPatient,
  UpdateReduxPatient
};

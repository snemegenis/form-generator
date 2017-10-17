import PatientList from "../ui/PatientList.jsx";
import PatientForm from "../ui/PatientForm.jsx";
import {printPatientAction, savePatientAction} from "../../action/action";
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {actions} from "react-redux-form";
import DisabilityForm from "../ui/DisabilityForm.jsx";
import {reduxForm} from "redux-form";
import PatientReduxForm from "../ui/PatientReduxForm.jsx";

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
    onSave(patient) {
      dispatch(savePatientAction(patient));
      hashHistory.push('/');
    },
    onBack() {
      dispatch(actions.reset("patients.activePatient"));
      hashHistory.push('/');
    }
  })
)(reduxForm({form: 'activePatient', fields: ['personalId']})(PatientReduxForm));

const AddDisability = connect(
  (state, ownProps) => ({
    formData: {
      ...state.patients.activeDisability,
      patientId: ownProps.patientId
    },
  }),
  dispatch => ({
    onSave(disability) {
      console.log('disability: ', disability);
      hashHistory.push('/');
    },

  })
)(DisabilityForm);

export {
  VisiblePatients,
  AddPatient,
  AddDisability,
  AddReduxPatient
};

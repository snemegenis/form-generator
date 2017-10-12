import PatientList from "../ui/PatientList.jsx";
import PatientForm from "../ui/PatientForm.jsx";
import {printPatientAction, savePatientAction} from "../../action/action";
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {actions} from "react-redux-form";

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
    onDisabilityAdd() {
      hashHistory.push('/patient/disability/add');
    }
  })
)(PatientList);

const AddPatient = connect(state => ({
    activePatientForm: state.forms.patients.activePatient && state.forms.patients.activePatient.$form ?
      state.forms.patients.activePatient.$form : {valid: false}
  }),
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

export {
  VisiblePatients,
  AddPatient
};

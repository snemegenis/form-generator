import PatientList from "../ui/PatientList.jsx";
import PatientForm from "../ui/PatientForm.jsx";
import {printPatientAction, savePatientAction} from "../../action/action";
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'

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
    }
  })
)(PatientList);

const AddPatient = connect(null,
  (dispatch, dispatchProps) => ({
    onSave(person) {
      console.log('Saving '+person);
      dispatch(savePatientAction({personalId: person.personalId}));
    }
  })
)(PatientForm);

export {
  VisiblePatients,
  AddPatient
};

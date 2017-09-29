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

const AddPatient = connect(state => ({
    doctorId: state.user.id,
    patient: state.patients.activePatientId ? state.patients.data[state.patients.activePatientId] : {}
  }),
  (dispatch, dispatchProps) => ({
    onSave(personalId) {
      console.log('Saving '+personalId);
      dispatch(savePatientAction({personalId}));
    }
  })
)(PatientForm);

export {
  VisiblePatients,
  AddPatient
};

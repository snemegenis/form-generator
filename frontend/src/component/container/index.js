import PatientList from "../ui/PatientList.jsx";
import PatientForm from "../ui/PatientForm.jsx";
import {printPatientAction, savePatientAction} from "../../action/action";
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
      hashHistory.push('/');
    }
  })
)(reduxForm({form: 'activePatient'})(PatientReduxForm));

const activeDisabilitySelector = formValueSelector('activeDisability');

const AddDisability = connect(
  (state, ownProps) => ({
    initialValues: {
      patientId: ownProps.patientId,
      treatments: []
    },
    otherTreatmentSelected: activeDisabilitySelector(state, 'treatments')
  }),
  dispatch => ({
    onSave(disability) {
      console.log('disability: ', disability);
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
  AddReduxPatient
};

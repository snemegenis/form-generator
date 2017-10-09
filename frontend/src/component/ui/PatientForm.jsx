import React, {PropTypes} from "react";
import {Form, Control} from "react-redux-form";

class PatientForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(patient) {
    this.props.onSave(patient);
  }

  render() {
    return <Form model="patients.activePatient" onSubmit={(patient)=>{this.handleSubmit(patient)}}>
        <label htmlFor="patient.personalId">
          <strong>Personal id:</strong>
          <Control.text model="patients.activePatient.personalId" id="patient.personalId" />
        </label>
      <label htmlFor="patient.firstName">
        <strong>First Name:</strong>
        <Control.text model="patients.activePatient.firstName" id="patient.firstName" />
      </label>
        <button type="submit">Save</button>
      </Form>
  }
}

PatientForm.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default PatientForm;


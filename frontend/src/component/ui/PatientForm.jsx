import React, {PropTypes} from "react";
import {Form, Control, Errors} from "react-redux-form";
import InputMask from 'react-input-mask';
import InputField from "./InputField.jsx";
import DatePicker from "react-datepicker";

const PersonalIdInput = (props) => {
  return <InputMask className="form-control" mask="99999999999" maskChar="_"
                    value={props.value ? props.value : ""} {...props}/>;
};

const BirthDateInput = (props) => {
  return <DatePicker dateFormat="YYYY-MM-DD" selected={props.value} className="form-control" {...props} />;
};

class PatientForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(patient) {
    this.props.onSave(patient);
  }

  render() {
    return <Form className="patient-form" model="patients.activePatient" onSubmit={(patient) => {
      this.handleSubmit(patient)
    }}>
      <Control type="hidden" model=".doctorId" defaultValue={this.props.doctorId} />
      <InputField id="patient.personalId" label="Enter personal id:" >
        <Control.text model=".personalId" id="patient.personalId" required validators={{
          valid: (val) => val && val.indexOf('_') === -1,
        }} component={PersonalIdInput}/>
        <Errors className="errors" model=".personalId" messages={{
          valid: 'Please enter a valid personal id.',
        }} show={{touched: true, focus: false}}/>
      </InputField>

      <InputField id="patient.birthDate" label="Enter date of birth:" defaultValue="">
        <Control model=".birthDate" id="patient.birthDate" required validators={{
          valid: (val) => val,
          }} component={BirthDateInput}
        />
        <Errors className="errors" model=".birthDate" messages={{
          valid: 'Please enter a date of birth.',
        }} show={{touched: true, focus: false}}/>
      </InputField>

      <InputField id="patient.firstName" label="First Name:">
        <Control.text model=".firstName" id="patient.firstName" required validators={{
          required: (val) => val && val.trim().length >= 0,
        }} className="form-control"/>
        <Errors className="errors" model=".firstName" messages={{
          required: 'Please enter a First Name.',
        }} show={{touched: true, focus: false}}/>
      </InputField>

      <InputField id="patient.lastName" label="Last Name:">
        <Control.text model=".lastName" id="patient.lastName" required validators={{
          required: (val) => val && val.trim().length >= 0,
        }} className="form-control"/>
        <Errors className="errors" model=".lastName" messages={{
          required: 'Please enter a Last Name.',
        }} show={{touched: true, focus: false}}/>
      </InputField>

      <InputField id="patient.occupation" label="Occupation:">
        <Control.text model=".occupation" id="patient.occupation" required validators={{
          required: (val) => val && val.trim().length >= 0,
        }} className="form-control"/>
        <Errors className="errors" model=".occupation" messages={{
          required: 'Please enter an Occupation .',
        }} show={{touched: true, focus: false}}/>
      </InputField>

      <button type="submit">Save</button>
    </Form>
  }
}

PatientForm.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default PatientForm;


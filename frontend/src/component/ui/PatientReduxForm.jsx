import React, {PropTypes} from "react";
import {Field, SubmissionError} from "redux-form";
import InputMask from 'react-input-mask';
import moment from "moment";
import InputField from "./InputField.jsx";
import {trimmedEmpty, maskedInvalid} from "../../util/ValidationUtil";

const MaskedInput = ({input, meta, mask}) => {
  return <div className="input-row">
  <InputMask className={"form-control " + (meta.error ? "is-invalid" : "")} mask={mask} maskChar="_"
                    alwaysShoMask="true" value={input.value ? input.value : ""} {...input} />
    {meta.error ? meta.error : ""}
  </div>;
};

const renderInput = ({input, meta}) => {
  return <div className="input-row">
    <input className={"form-control " + (meta.error ? "is-invalid" : "")} value={input.value ? input.value : ""}
           {...input} />
    {meta.error ? meta.error : ""}
  </div>;
};

class PatientReduxForm extends React.Component {

  constructor(props) {
    super(props);
  }

  validate(patient) {
    let errors = {};
    let errorExist = false;
    if (maskedInvalid(patient.personalId)) {
      errors.personalId = 'Enter a valid personal id.';
      errorExist = true;
    }
    if (maskedInvalid(patient.birthDate) || !moment(patient.birthDate).isValid()
    || moment().diff(moment(patient.birthDate), 'years') > 100) {
      errors.birthDate='Enter a valid birth date.';
      errorExist = true;
    }

    if (trimmedEmpty(patient.firstName)) {
      errors.firstName='Enter a first name.';
      errorExist = true;
    }
    if (trimmedEmpty(patient.lastName)) {
      errors.lastName='Enter a last name.';
      errorExist = true;
    }
    if (trimmedEmpty(patient.occupation)) {
      errors.occupation='Enter an occupation.';
      errorExist = true;
    }

    if (errorExist) {
      throw new SubmissionError(errors);
    }
  }

  handleSubmit(patient) {
    this.validate(patient);
    this.props.onSave(patient);
  }

  render() {
    const {invalid, handleSubmit} = this.props;
    return <form className="patient-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
      <InputField id="patient.personalId" label="Enter personal id:">
        <Field name="personalId" id="patient.personalId" component={MaskedInput} mask="99999999999"/>
      </InputField>

      <InputField id="patient.birthDate" label="Enter date of birth:" defaultValue="">
        <Field name="birthDate" id="patient.birthDate" component={MaskedInput} mask="9999-99-99"/>
      </InputField>

      <InputField id="patient.firstName" label="First Name:">
        <Field name="firstName" id="patient.firstName"
               className="form-control" component={renderInput}/>
      </InputField>

      <InputField id="patient.lastName" label="Last Name:">
        <Field name="lastName" id="patient.lastName"
               className="form-control" component={renderInput}/>
      </InputField>

      <InputField id="patient.occupation" label="Occupation:">
        <Field name="occupation" id="patient.occupation"
               className="form-control" component={renderInput}/>
      </InputField>
      <button className="btn" type="submit" disabled={invalid}>Save</button>
      <button className="btn" type="button" onClick={this.props.onBack}>Back</button>
    </form>
  }
}

PatientReduxForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default PatientReduxForm;


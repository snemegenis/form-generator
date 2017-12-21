import React, {PropTypes} from "react";
import {Field, Form, SubmissionError} from "redux-form";
import InputMask from 'react-input-mask';
import moment from "moment";
import {trimmedEmpty, maskedInvalid} from "../../util/ValidationUtil";
import TextareaAutosize from 'react-autosize-textarea';
import InputFieldWithError from "./InputFieldWithError.jsx";

const MaskedInput = ({id, label, input, meta, mask, labelClass, inputClass}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error} labelClass={labelClass} inputClass={inputClass}>
    <InputMask className="form-control" mask={mask} maskChar="_"
               value={input.value ? input.value : ""} {...input} />
  </InputFieldWithError>
};

const renderInput = ({id, label, input, meta, labelClass, inputClass}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error} labelClass={labelClass} inputClass={inputClass}>
    <input className="form-control" value={input.value ? input.value : ""}
           {...input} />
  </InputFieldWithError>;
};

const renderArea = ({id, label, input, meta, labelClass, inputClass}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error} labelClass={labelClass} inputClass={inputClass}>
    <TextareaAutosize className="form-control " value={input.value ? input.value : ""}
                      {...input} />
  </InputFieldWithError>;
};

class PatientForm extends React.Component {

  constructor(props) {
    super(props);
  }

  validate(patient) {
    const {t} = this.props;
    let errors = {};
    let errorExist = false;
    if (maskedInvalid(patient.personalId)) {
      errors.personalId = t('Enter a valid personal id.');
      errorExist = true;
    }
    if (maskedInvalid(patient.birthDate) || !moment(patient.birthDate).isValid()
      || moment().diff(moment(patient.birthDate), 'years') > 100) {
      errors.birthDate = t('Enter a valid birth date.');
      errorExist = true;
    }

    if (trimmedEmpty(patient.firstName)) {
      errors.firstName = t('Enter a first name.');
      errorExist = true;
    }
    if (trimmedEmpty(patient.lastName)) {
      errors.lastName = t('Enter a last name.');
      errorExist = true;
    }
    if (patient.phone && maskedInvalid(patient.phone)) {
      errors.phone = t('Enter a valid phone.');
      errorExist = true;
    }
    if (patient.mobilePhone && maskedInvalid(patient.mobilePhone)) {
      errors.mobilePhone = t('Enter a valid mobile phone.');
      errorExist = true;
    }
    if (trimmedEmpty(patient.address)) {
      errors.address = t('Enter an address.');
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
    const {pristine, error, invalid, handleSubmit, t} = this.props;

    return <Form className="patient-form form-horizontal" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

      <Field id="patient.personalId" label={t("Personal id") + ":"} name="personalId"
             component={MaskedInput} mask="99999999999" />
      <Field id="patient.birthDate" label={t("Date of birth") + ":"} name="birthDate"
             component={MaskedInput} mask="9999-99-99" />

      <Field name="firstName" id="patient.firstName" label={t("First name") + ":"}
             className="form-control" component={renderInput} />
      <Field name="lastName" id="patient.lastName" label={t("Last name") + ":"}
             className="form-control" component={renderInput} />

          <Field name="address" id="patient.address" label={t("Address") + ":"}
                 className="form-control" component={renderArea} rows="4" />

      <Field name="occupation" id="patient.occupation" label={t("Occupation") + ":"}
             className="form-control" component={renderInput}/>

      <Field name="phone" className="form-control" component={MaskedInput} mask="+370-999-99999"
             id="patient.phone" label={t("Phone") + ":"}/>

      <Field id="patient.mobilePhone" label={t("Mobile phone") + ":"} name="mobilePhone"
             className="form-control" component={MaskedInput} mask="+370-999-99999"/>

      <Field name="email" id="patient.email" label={t("Email") + ":"} className="form-control"
             component={renderInput}/>

      <Field id="patient.employer" label={t("Employer") + ":"}
             className="form-control" component={renderInput}/>

      {error && <div>{error}</div>}

      <button className="btn btn-default" type="submit" disabled={invalid}>{t("Save")}</button>
      <button className="btn btn-default" type="button" onClick={(e) => this.props.onBack(e, !pristine)}>{t("Back")}</button>
    </Form>
  }
}

PatientForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default PatientForm;


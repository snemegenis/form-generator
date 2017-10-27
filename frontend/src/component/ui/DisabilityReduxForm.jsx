import React, {PropTypes} from "react";
import {Field, FieldArray, Fields, SubmissionError} from "redux-form";
import InputField from "./InputField.jsx";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import InputMask from 'react-input-mask';
import moment from "moment";
import {trimmedEmpty, maskedInvalid} from "../../util/ValidationUtil";

const renderMaskedInput = ({input, meta, mask}) => {
  return <div className="input-row">
    <InputMask className={"form-control " + (meta.error ? "is-invalid" : "")} mask={mask} maskChar="_"
               alwaysShowMask="true" value={input.value ? input.value : ""} {...input} />
    {meta.error ? meta.error : ""}
  </div>;
};

const renderArea = ({input, meta}) => {
  return <div className="input-row">
    <textarea className={"form-control " + (meta.error ? "is-invalid" : "")} value={input.value ? input.value : ""}
              {...input} />
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

const renderCheckboxes = (props) => {
  const {name, input, meta, checkboxes, className} = props;
  return <div className="input-row">
    <CheckboxGroup className={className} name={name} value={input.value ? input.value : []} onChange={input.onChange}>
      {checkboxes.map((checkbox, index) => <label key={"label" + index}>
        <Checkbox key={"checkbox" + index} value={checkbox.value}/>{checkbox.label}</label>)}
    </CheckboxGroup>
    {meta.error ? meta.error : ""}
  </div>;
};

const Diagnosis = ({name, title, withDetails=false}) => (
  <div>
    {title && <h4>{title}</h4>}
    <InputField id={`disability.${name}.code`} label="Enter code:">
      <Field name={`${name}.code`} id={`disability.${name}.code`}
             component={renderMaskedInput} mask="aaa-9999"/>
    </InputField>
    <InputField id={`disability.${name}.code`} label="Enter text:">
      <Field name={`${name}.text`} id={`disability.${name}.text`}
             component={renderInput}/>
    </InputField>
    <InputField id={`disability.${name}.functionalClass`} label="Enter functional class:">
      <Field name={`${name}.functionalClass`} id={`disability.${name}.functionalClass`}
             component={renderInput}/>
    </InputField>
    <InputField id={`disability.${name}.degree`} label="Enter degree:">
      <Field name={`${name}.degree`} id={`disability.${name}.degree`}
             component={renderInput}/>
    </InputField>
    <InputField id={`disability.${name}.stage`} label="Enter stage:">
      <Field name={`${name}.stage`} id={`disability.${name}.stage`}
             component={renderInput}/>
    </InputField>
    <InputField id={`disability.${name}.history`} label="Enter history:">
      <Field name={`${name}.history`} id={`disability.${name}.history`}
             component={renderArea}/>
    </InputField>
    {withDetails && <InputField id={`disability.${name}.details`} label="Enter details:">
      <Field name={`${name}.details`} id={`disability.${name}.details`}
             component={renderArea}/>
    </InputField>}
  </div>
);
Diagnosis.propTypes = {
  name: PropTypes.string.isRequired,
  withDetails: PropTypes.bool,
  title: PropTypes.string
};

const renderDiagnosis = ({fields, meta}) => (
  <ul>
    <li>
      <button className="btn" type="button" onClick={() => fields.push({})}>Add Diagnosis</button>
    </li>
    {fields.map((diagnosis, index) =>
      <li key={index}>
        <Diagnosis name={`${diagnosis}`} withDetails={true}/>
        <button
          type="button"
          className="btn"
          onClick={() => fields.remove(index)}>Remove Diagnosis
        </button>
      </li>
    )}
    {meta.error ? meta.error : ""}
  </ul>
);

const renderAppointments = ({fields, meta}) => (
  <ul>
    <li>
      <button className="btn" type="button" onClick={() => fields.push({})}>Add appointment</button>
    </li>
    {fields.map((appointment, index) =>
      <li key={index}>
        <h4>Appointment #{index + 1}</h4>

        <InputField id={`disability.appointment${index}.date`} label="Enter date:">
          <Field name={`${appointment}.date`} id={`disability.appointment${index}.date`}
                 component={renderMaskedInput} mask="9999-99-99"/>
        </InputField>

        <InputField id={`disability.appointment${index}.doctorType`} label="Enter doctor type:">
          <Field name={`${appointment}.doctorType`} id={`disability.appointment${index}.doctorType`}
                 component={renderInput}/>
        </InputField>

        <InputField id={`disability.appointment${index}.observation`} label="Enter observation:">
          <Field name={`${appointment}.observation`} id={`disability.appointment${index}.observation`}
                 component={renderArea}/>
        </InputField>

        <InputField id={`disability.appointment${index}.attachment`} label="Enter attachment:">
          <Field name={`${appointment}.attachment`} id={`disability.appointment${index}.attachment`}
                 component={renderInput}/>
        </InputField>

        <button
          type="button"
          className="btn"
          onClick={() => fields.remove(index)}>Remove appointment
        </button>
      </li>
    )}
    {meta.error ? meta.error : ""}
  </ul>
);

const otherTreatmentSelected = (treatmentSelected) =>
  treatmentSelected && treatmentSelected.indexOf('OTHER') > -1;

class DisabilityReduxForm extends React.Component {

  constructor(props) {
    super(props);
  }

  validateDiagnosis(diagnosis, error, withDetails = false) {

    let errorExist = false;
    if (maskedInvalid(diagnosis.code)) {
      error.code = 'Enter valid code';
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.text)) {
      error.text = 'Enter text';
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.functionalClass)) {
      error.functionalClass = 'Enter functional class';
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.degree)) {
      error.degree = 'Enter degree';
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.stage)) {
      error.stage = 'Enter stage';
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.history)) {
      error.history = 'Enter history';
      errorExist = true;
    }
    if (withDetails && trimmedEmpty(diagnosis.details)) {
      error.details = 'Enter details';
      errorExist = true;
    }

    return errorExist;

  }

  validate(disability) {
    let errors = {};
    let errorExist = false;
    if (trimmedEmpty(disability.history)) {
      errors.history = 'Enter history.';
      errorExist = true;
    }
    if (!disability.treatments || disability.treatments.length === 0) {
      errors.treatments = 'Enter one treatment at least.';
      errorExist = true;
    }

    if (otherTreatmentSelected(disability.treatments)
      && trimmedEmpty(disability.otherTreatment)) {
      errors.otherTreatment = 'Enter other treatment.';
      errorExist = true;
    }
    if (trimmedEmpty(disability.treatmentHistory)) {
      errors.treatmentHistory = 'Enter treatment history.';
      errorExist = true;
    }

    if (disability.appointments && disability.appointments.length > 0) {
      errors.appointments = [];
      disability.appointments.forEach((appointment, index) => {
        errors.appointments[index] = {};

        if (maskedInvalid(appointment.date) || !moment(appointment.date).isValid()) {
          errors.appointments[index].date = 'Enter valid date';
          errorExist = true;
        }

        if (trimmedEmpty(appointment.doctorType)) {
          errors.appointments[index].doctorType = 'Enter doctor type';
          errorExist = true;
        }

        if (trimmedEmpty(appointment.observation)) {
          errors.appointments[index].observation = 'Enter observation';
          errorExist = true;
        }

      });
    } else {
      errors.appointments = {_error: "Enter one appointment at least"};
      errorExist = true;
    }

    if (trimmedEmpty(disability.latestDisabilityDesc)) {
      errors.latestDisabilityDesc = 'Enter latest disability description.';
      errorExist = true;
    }

    errors.mainDiagnosis = {};
    if (this.validateDiagnosis(disability.mainDiagnosis, errors.mainDiagnosis)) {
      errorExist = true;
    }

    if (disability.otherDiagnosis && disability.otherDiagnosis.length > 0) {
      errors.otherDiagnosis = [];
      disability.otherDiagnosis.forEach((diagnosis, index) => {
        errors.otherDiagnosis[index] = {};
        if (this.validateDiagnosis(diagnosis, errors.otherDiagnosis[index], true)) {
          errorExist = true;
        }
      })
    }

    if (!disability.disabilityTypes || disability.disabilityTypes.length === 0) {
      errors.disabilityTypes = 'Enter one disability at least.';
      errorExist = true;
    }

    if (errorExist) {
      throw new SubmissionError(errors);
    }
  }

  handleSubmit(disability) {
    this.validate(disability);
    this.props.onSave(disability);
  }

  render() {
    const {invalid, handleSubmit, submitting, treatmentSelected} = this.props;
    const treatments = [
      {label: 'Ambulatoric', value: 'AMBULATORIC'},
      {label: 'Medicaments', value: 'MEDICAMENTS'},
      {label: 'Stationary', value: 'STATIONARY'},
      {label: 'Surgery', value: 'SURGERY'},
      {label: 'Reabilitation', value: 'REABILITATION'},
      {label: 'Other', value: 'OTHER'}
    ];
    const disabilityTypes = [
      {label: 'Working Capacity Level', value: 'WORKING_CAPACITY_LEVEL'},
      {label: 'First Time', value: 'FIRST_TIME'},
      {label: 'Disability Level', value: 'DISABILITY_LEVEL'},
      {label: 'Expired', value: 'EXPIRED'},
      {label: 'Special Requirement', value: 'SPECIAL_REQUIREMENT'},
      {label: 'Health Condition Changed', value: 'HEALTH_COND_CHANGED'},
      {label: 'Ordered By Person', value: 'REQUIRED_BY_PERSON'}
    ];

    return <form className="disability-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

      <Field component="input" type="hidden" name="patientId"/>

      <InputField id="disability.history" label="Enter history:">
        <Field name="history" id="disability.personalId" component={renderArea}/>
      </InputField>

      <InputField id="disability.treatments" label="Enter treatments:">
        <Field name="treatments" id="disability.treatments" component={renderCheckboxes}
               checkboxes={treatments}/>
      </InputField>

      {otherTreatmentSelected(treatmentSelected) &&
      <InputField id="disability.otherTreatment" label="Enter other treatment:">
        <Field name="otherTreatment" id="disability.otherTreatment" component={renderInput}/>
      </InputField>
      }

      <InputField id="disability.treatmentHistory" label="Enter treatment history:">
        <Field name="treatmentHistory" id="disability.treatmentHistory" component={renderArea}/>
      </InputField>

      <div className="form-group">
        <h4>Appointments</h4>
        <FieldArray name="appointments" component={renderAppointments}/>
      </div>

      <InputField id="disability.bartelIndex" label="Enter Bartel index:">
        <Field name="bartelIndex" id="patient.bartelIndex" component={renderMaskedInput} mask="99"/>
      </InputField>

      <InputField id="disability.latestDisabilityDesc" label="Enter latest disability description:">
        <Field name="latestDisabilityDesc" id="disability.latestDisabilityDesc" component={renderArea}/>
      </InputField>

      <div className="form-group">
        <h4>Main diagnosis</h4>
        <Diagnosis name="mainDiagnosis"/>
      </div>

      <div className="form-group">
        <h4>Other diagnosis</h4>
        <FieldArray name="otherDiagnosis" component={renderDiagnosis} />
      </div>

      <InputField id="disability.disabilityTypes" label="Enter disability types:">
        <Field name="disabilityTypes" id="disability.disabilityTypes" component={renderCheckboxes}
               checkboxes={disabilityTypes}/>
      </InputField>

      <button className="btn" type="submit" disabled={invalid || submitting}>Save</button>
      <button className="btn" type="button" onClick={this.props.onBack}>Back</button>
    </form>
  }
}

DisabilityReduxForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default DisabilityReduxForm;


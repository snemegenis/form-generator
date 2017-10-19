import React, {PropTypes} from "react";
import {Field, SubmissionError} from "redux-form";
import InputField from "./InputField.jsx";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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

const maskedRequired = (val) => val && val.indexOf('_') === -1;
const trimRequired = (val) => val && val.trim().length > 0;

class DisabilityReduxForm extends React.Component {

  constructor(props) {
    super(props);
  }

  validate(disability) {
    let errors = {};
    let errorExist = false;
    if (!trimRequired(disability.history)) {
      errors.history = 'Enter history.';
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
    const {invalid, handleSubmit, otherTreatmentSelected} = this.props;
    const treatments = [
      {label: 'Ambulatoric', value: 'AMBULATORIC'},
      {label: 'Medicaments', value: 'MEDICAMENTS'},
      {label: 'Stationary', value: 'STATIONARY'},
      {label: 'Surgery', value: 'SURGERY'},
      {label: 'Reabilitation', value: 'REABILITATION'},
      {label: 'Other', value: 'OTHER'}
      ];

    return <form className="disability-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

      <Field component="input" type="hidden" name="patientId"/>

      <InputField id="disability.history" label="Enter history:">
        <Field name="history" id="patient.personalId" component={renderArea}/>
      </InputField>

      <InputField id="disability.treatments" label="Enter treatments:">
        <Field name="treatments" id="patient.treatments" component={renderCheckboxes}
               checkboxes={treatments} />
      </InputField>

      {otherTreatmentSelected && otherTreatmentSelected.indexOf('OTHER') > -1 &&
        <InputField id="disability.otherTreatment" label="Enter other treatment:">
          <Field name="otherTreatment" id="disability.otherTreatment" component={renderInput}/>
        </InputField>
      }

      <button className="btn" type="submit" disabled={invalid}>Save</button>
      <button className="btn" type="button" onClick={this.props.onBack}>Back</button>
    </form>
  }
}

DisabilityReduxForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default DisabilityReduxForm;


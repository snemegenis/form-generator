import React, {PropTypes} from "react";
import {Field, FieldArray, Form, SubmissionError} from "redux-form";
import moment from "moment";
import {trimmedEmpty, maskedInvalid} from "../../util/ValidationUtil";
import {Button, ButtonToolbar, Col, Glyphicon, Row} from "react-bootstrap";
import {DISABILITY_TYPES, TREATMENTS} from "./constant";
import Input from "./form/Input.jsx";
import Appointments from "./Appointments.jsx";
import NumberInput from "./form/NumberInput.jsx";
import InputArea from "./form/InputArea.jsx";
import Diagnosis from "./Diagnosis.jsx";
import OtherDiagnosis from "./OtherDiagnosis.jsx";
import InputCheckboxGroup from "./form/InputCheckboxGroup.jsx";

const otherTreatmentSelected = (treatmentSelected) =>
  treatmentSelected && treatmentSelected.indexOf('OTHER') > -1;

class DisabilityForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mainDiagnosisOpen: false};
  }

  componentDidMount() {
    this.autoSaveTimer = setInterval(() => {
      this.props.onAutoSaveTmpTimeout();
    }, APP_CONFIG.AUTO_SAVE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.autoSaveTimer);
  }

  isDiagnosisCodeInvalid(code) {
    return !(code && code.match(/^\w+-\w+$/) !== null);
  }

  isDiagnosisInvalid(diagnosis, error) {

    const {t} = this.props;

    let errorExist = false;
    if (!diagnosis) {
      diagnosis = {};
    }
    if (this.isDiagnosisCodeInvalid(diagnosis.code)) {
      error.code = t('Enter valid code');
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.text)) {
      error.text = t('Enter text');
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.functionalClass)) {
      error.functionalClass = t('Enter functional class');
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.degree)) {
      error.degree = t('Enter degree');
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.stage)) {
      error.stage = t('Enter stage');
      errorExist = true;
    }
    if (trimmedEmpty(diagnosis.history)) {
      error.history = t('Enter diagnosis history');
      errorExist = true;
    }

    return errorExist;

  }

  validate(disability) {
    const {t} = this.props;

    let errors = {};
    let errorExist = false;
    if (trimmedEmpty(disability.history)) {
      errors.history = t('Enter history.');
      errorExist = true;
    }
    if (!disability.treatments || disability.treatments.length === 0) {
      errors.treatments = t('Enter one treatment at least.');
      errorExist = true;
    }

    if (otherTreatmentSelected(disability.treatments)
      && trimmedEmpty(disability.otherTreatment)) {
      errors.otherTreatment = t('Enter other treatment.');
      errorExist = true;
    }
    if (trimmedEmpty(disability.treatmentHistory)) {
      errors.treatmentHistory = t('Enter treatment history.');
      errorExist = true;
    }
    if (isNaN(disability.barthelIndex)) {
      errors.barthelIndex = t('Enter valid barthel index.');
      errorExist = true;
    }

    if (disability.appointments && disability.appointments.length > 0) {
      errors.appointments = [];
      disability.appointments.forEach((appointment, index) => {
        errors.appointments[index] = {};

        if (maskedInvalid(appointment.date) || !moment(appointment.date).isValid()) {
          errors.appointments[index].date = t('Enter valid date');
          errorExist = true;
        }

        if (trimmedEmpty(appointment.doctorType)) {
          errors.appointments[index].doctorType = t('Enter doctor type');
          errorExist = true;
        }

        if (trimmedEmpty(appointment.observation)) {
          errors.appointments[index].observation = t('Enter observation');
          errorExist = true;
        }

      });
    } else {
      errors.appointments = {_error: t("Enter one appointment at least")};
      errorExist = true;
    }

    if (trimmedEmpty(disability.latestDisabilityDesc)) {
      errors.latestDisabilityDesc = t('Enter latest disability description.');
      errorExist = true;
    }

    errors.mainDiagnosis = {};
    if (this.isDiagnosisInvalid(disability.mainDiagnosis, errors.mainDiagnosis)) {
      errorExist = true;
    }

    if (disability.otherDiagnosis && disability.otherDiagnosis.length > 0) {
      errors.otherDiagnosis = [];
      disability.otherDiagnosis.forEach((diagnosis, index) => {
        errors.otherDiagnosis[index] = {};
        if (this.isDiagnosisInvalid(diagnosis, errors.otherDiagnosis[index], true)) {
          errorExist = true;
        }
      })
    }

    if (!disability.disabilityTypes || disability.disabilityTypes.length === 0) {
      errors.disabilityTypes = t('Enter one disability at least.');
      errorExist = true;
    }

    if (errorExist) {
      throw new SubmissionError(errors);
    }
  }

  removeInvalidDates(disability) {
    if (disability.appointments && disability.appointments.length > 0) {
      disability.appointments.forEach((appointment, index, appointments) => {
        if (!moment(appointment.date).isValid()) {
          delete appointments[index].date;
        }
      });
    }
  }

  handleAutoSubmit(disability) {
    const {dirty} = this.props;
    if (dirty) {
      this.removeInvalidDates(disability);
      this.props.onAutoSaveTmp(disability);
    }
  }

  handleSubmit(input) {
    const {disability, pressed} = input;
    const {dirty} = this.props;

    switch (pressed) {
      case 'Save':
        this.validate(disability);
        disability.id = this.props.disabilityReportId;
        this.props.onSave(disability);
        break;
      default:
        if (dirty) {
          this.removeInvalidDates(disability);
          this.props.onSaveTmp(disability);
        } else {
          this.props.onBack(dirty);
        }
        break;
    }

  }

  render() {
    const {
      dirty, invalid, handleSubmit, submitting, treatmentSelected, otherDiagnosisAssigned, t, onRemoveDiagnosis,
      onRemoveAppointment} = this.props;

    return <Form className="disability-form" onSubmit={handleSubmit(this.handleAutoSubmit.bind(this))}>

      <Field component="input" type="hidden" name="patientId"/>

      <Row>
        <Field name="history" component={InputArea}
               id="disability.history" label={t("History")} outerDivClass="col-lg-12" rows={4}/>
      </Row>

      <Row>
        <Field name="treatments" component={InputCheckboxGroup}
               outerDivClass="col-lg-12"
               checkboxes={TREATMENTS} id="disability.treatments" label={t("Treatments")} columns={4}/>
      </Row>

      {otherTreatmentSelected(treatmentSelected) &&
      <Row>
        <Field id="disability.otherTreatment" label={t("Other treatment")}
               name="otherTreatment" component={Input}
               outerDivClass="col-lg-12"/>
      </Row>
      }

      <Row>
        <Field name="treatmentHistory" component={InputArea} rows={4}
               id="disability.treatmentHistory" label={t("Treatment history")} outerDivClass="col-lg-12"/>
      </Row>

      <Row>
        <Col lg={12}>
          <FieldArray name="appointments" t={t} onRemoveAppointment={onRemoveAppointment}
                      component={Appointments} label={t("Appointments")}/>
        </Col>
      </Row>

      <Field name="barthelIndex"
             id="disability.barthelIndex" label={t("Barthel index")} component={NumberInput} nbrFormat="##"/>

      <Field name="latestDisabilityDesc" component={InputArea}
             id="disability.latestDisabilityDesc" label={t("Latest disability description")}
             rows={4}/>

      <div className="diagnosis form-group">
        <h4>{t("Main diagnosis")}</h4>
        <Diagnosis t={t} name="mainDiagnosis"/>
      </div>

      <div className="diagnosis form-group">
        <h4>{t("Other diagnosis")}</h4>
        <FieldArray t={t} onRemoveDiagnosis={onRemoveDiagnosis} name="otherDiagnosis"
                    component={OtherDiagnosis} selector={otherDiagnosisAssigned}/>
      </div>

      <Field name="disabilityTypes" component={InputCheckboxGroup}
             id="disability.disabilityTypes" label={t("Disability types")} columns={4}
             checkboxes={DISABILITY_TYPES}/>


      <ButtonToolbar>
        <Button onClick={handleSubmit(values => this.handleSubmit.apply(this, [{
          disability: {...values}, pressed: 'Save'
        }]))} disabled={invalid || submitting}><Glyphicon glyph="save"/> {t("Save")}
        </Button>
        <Button onClick={handleSubmit(values => this.handleSubmit.apply(this, [{
          disability: {...values}, pressed: 'Close'
        }]))}><Glyphicon glyph="level-up"/> {t("Close")}
        </Button>
        <Button className="pull-right" onClick={(e) => {e.preventDefault(); this.props.onBack(dirty);}}>
          <Glyphicon glyph="level-up"/> {t("Cancel")}
        </Button>
      </ButtonToolbar>
    </Form>
  }
}

DisabilityForm.propTypes = {
  onAutoSaveTmpTimeout: PropTypes.func.isRequired,
  onAutoSaveTmp: PropTypes.func.isRequired,
  onSaveTmp: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onRemoveDiagnosis: PropTypes.func.isRequired,
  onRemoveAppointment: PropTypes.func.isRequired
};

export default DisabilityForm;


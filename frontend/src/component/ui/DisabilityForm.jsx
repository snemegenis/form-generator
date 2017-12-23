import React, {PropTypes} from "react";
import {Field, FieldArray, Fields, Form, SubmissionError} from "redux-form";
import InputField from "./InputField.jsx";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import InputMask from 'react-input-mask';
import TextareaAutosize from 'react-autosize-textarea';
import moment from "moment";
import {trimmedEmpty, maskedInvalid} from "../../util/ValidationUtil";
import NumberFormat from 'react-number-format';
import InputFieldWithError from "./InputFieldWithError.jsx";
import {Button, Col, Glyphicon, Row, Table} from "react-bootstrap";

const renderNumberInput = ({input, meta, nbrFormat}) => {
    return <div className="input-row">
        <NumberFormat className={"form-control " + (meta.error ? "is-invalid" : "")} format={nbrFormat}
                      value={input.value ? input.value : ""} {...input} />
        {meta.error ? meta.error : ""}
    </div>;
};

const renderMaskedInput = ({id, label, input, meta, outerDivClass, labelClass, inputClass, mask}) => {
    return <InputFieldWithError id={id} label={label} error={meta.error}
                                outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
        <InputMask className={"form-control " + (meta.error ? "is-invalid" : "")} mask={mask} maskChar="_"
                   alwaysShowMask="true" value={input.value ? input.value : ""} {...input} />
    </InputFieldWithError>;
};

const renderArea = ({id, label, input, meta, outerDivClass, labelClass, inputClass, rows}) => {
    return <InputFieldWithError id={id} label={label} error={meta.error}
                                outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
        <TextareaAutosize className="form-control" rows={rows} value={input.value ? input.value : ""}
                          {...input} />
    </InputFieldWithError>;
};

const renderInput = ({id, label, input, meta, outerDivClass, labelClass, inputClass}) => {
    return <InputFieldWithError id={id} label={label} error={meta.error}
                                outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
        <input className={"form-control " + (meta.error ? "is-invalid" : "")} value={input.value ? input.value : ""}
               {...input} />
    </InputFieldWithError>;
};

const renderCheckboxes = (props) => {
    const {id, name, label, input, meta, checkboxes, outerDivClass, labelClass, inputClass} = props;
    return <InputFieldWithError id={id} label={label} error={meta.error}
                                outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
        <CheckboxGroup name={name} value={input.value ? input.value : []}
                       onChange={input.onChange}>
            {checkboxes.map((checkbox, index) => <label className="checkbox-inline" key={"label" + index}>
                <Checkbox key={"checkbox" + index} value={checkbox.value}/>{checkbox.label}</label>)}
        </CheckboxGroup>
    </InputFieldWithError>;
};

const Diagnosis = ({t, name, title, withDetails = false}) => (
    <div>
        {title && <h4>{title}</h4>}
        <InputField id={`disability.${name}.code`} label={t("Code")}>
            <Field name={`${name}.code`} id={`disability.${name}.code`}
                   component={renderMaskedInput} mask="aaa-9999"/>
        </InputField>
        <InputField id={`disability.${name}.code`} label={t("Text")}>
            <Field name={`${name}.text`} id={`disability.${name}.text`}
                   component={renderInput}/>
        </InputField>
        <InputField id={`disability.${name}.functionalClass`} label={t("Functional class")}>
            <Field name={`${name}.functionalClass`} id={`disability.${name}.functionalClass`}
                   component={renderInput}/>
        </InputField>
        <InputField id={`disability.${name}.degree`} label={t("Degree")}>
            <Field name={`${name}.degree`} id={`disability.${name}.degree`}
                   component={renderInput}/>
        </InputField>
        <InputField id={`disability.${name}.stage`} label={t("Stage")}>
            <Field name={`${name}.stage`} id={`disability.${name}.stage`}
                   component={renderInput}/>
        </InputField>
        <InputField id={`disability.${name}.history`} label={t("Diagnosis history")}>
            <Field name={`${name}.history`} id={`disability.${name}.history`}
                   component={renderArea} rows="5"/>
        </InputField>
        {withDetails && <InputField id={`disability.${name}.details`} label={t("Diagnosis details")}>
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

const renderDiagnosis = ({onRemoveDiagnosis, t, fields, meta}) => (
    <ul>
        <li>
            <button className="btn" type="button" onClick={() => fields.push({})}>{t("Add Diagnosis")}</button>
        </li>
        {fields.map((diagnosis, index) =>
            <li key={index}>
                <Diagnosis t={t} name={`${diagnosis}`} withDetails={true}/>
                <button
                    type="button"
                    className="btn"
                    onClick={() => onRemoveDiagnosis(() => fields.remove(index))}>{t("Remove Diagnosis")}
                </button>
            </li>
        )}
        {meta.error ? meta.error : ""}
    </ul>
);

const renderAppointments = ({onRemoveAppointment, t, fields, meta, label}) => (
    <div className={"form-group " + (meta.error ? "has-error " : "")}>
        <label htmlFor="appointmentsField" className="control-label">{label}</label>
        <Table id="appointmentsTable" className="appointments borderless-but-last-body">
            <thead>
            <tr>
                <th>{t("Date")}</th>
                <th>{t("Doctor type")}</th>
                <th>{t("Observation")}</th>
                <th>{t("Attachment")}</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {fields.map((appointment, index) =>
                <tr>
                    <td>
                        <Field name={`${appointment}.date`}
                               component={renderMaskedInput} mask="9999-99-99"
                               id={`disability.appointment${index}.date`} size={10}/>
                    </td>

                    <td className="col-lg-2">
                        <Field name={`${appointment}.doctorType`}
                               component={renderInput}
                               id={`disability.appointment${index}.doctorType`}/>
                    </td>

                    <td>
                        <Field name={`${appointment}.observation`}
                               id={`disability.appointment${index}.observation`}
                               component={renderArea}/>
                    </td>

                    <td className="col-lg-2">
                        <Field name={`${appointment}.attachment`}
                               id={`disability.appointment${index}.attachment`}
                               component={renderArea}/>
                    </td>

                    <td>
                        <div className="form-group ">
                            <Button onClick={() => onRemoveAppointment(() => fields.remove(index))}>
                                <Glyphicon glyph="minus" /></Button>
                        </div>
                    </td>
                </tr>
            )}

            <tr>
                <td colSpan={5}><Button onClick={() => fields.push({primary: false})}>{t('Add appointment')}</Button>
                </td>
            </tr>
            </tbody>
        </Table>
        {meta.error ? <div className="help-block with-errors">{meta.error}</div> : ""}
    </div>
);

const otherTreatmentSelected = (treatmentSelected) =>
    treatmentSelected && treatmentSelected.indexOf('OTHER') > -1;

class DisabilityForm extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.autoSaveTimer = setInterval(() => {
            this.props.onAutoSaveTmpTimeout();
        }, APP_CONFIG.AUTO_SAVE_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.autoSaveTimer);
    }

    validateDiagnosis(diagnosis, error) {

        const {t} = this.props;

        let errorExist = false;
        if (!diagnosis) {
            diagnosis = {};
        }
        if (maskedInvalid(diagnosis.code)) {
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
        if (maskedInvalid('' + disability.barthelIndex)) {
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
            errors.disabilityTypes = t('Enter one disability at least.');
            errorExist = true;
        }

        if (errorExist) {
            throw new SubmissionError(errors);
        }
    }

    handleAutoSubmit(disability) {
        const {dirty} = this.props;
        if (dirty) {
            this.props.onAutoSaveTmp(disability);
        }
    }

    handleSubmit(input) {
        const {disability, pressed} = input;
        switch (pressed) {
            case 'Save':
                this.validate(disability);
                disability.id = this.props.disabilityReportId;
                this.props.onSave(disability);
                break;
            default:
                this.props.onSaveTmp(disability);
                break;
        }

    }

    render() {
        const {
            dirty, invalid, handleSubmit, submitting, treatmentSelected, disabilityReportId, t, onRemoveDiagnosis,
            onRemoveAppointment
        } = this.props;
        console.log(`disabilityReportId=${disabilityReportId}`);
        const treatments = [
            {label: t('Ambulatoric'), value: 'AMBULATORIC'},
            {label: t('Medicaments'), value: 'MEDICAMENTS'},
            {label: t('Stationary'), value: 'STATIONARY'},
            {label: t('Surgery'), value: 'SURGERY'},
            {label: t('Reabilitation'), value: 'REABILITATION'},
            {label: t('Other'), value: 'OTHER'}
        ];
        const disabilityTypes = [
            {label: t('Working Capacity Level'), value: 'WORKING_CAPACITY_LEVEL'},
            {label: t('First Time'), value: 'FIRST_TIME'},
            {label: t('Disability Level'), value: 'DISABILITY_LEVEL'},
            {label: t('Expired'), value: 'EXPIRED'},
            {label: t('Special Requirement'), value: 'SPECIAL_REQUIREMENT'},
            {label: t('Health Condition Changed'), value: 'HEALTH_COND_CHANGED'},
            {label: t('Ordered By Person'), value: 'REQUIRED_BY_PERSON'}
        ];

        return <Form className="disability-form" onSubmit={handleSubmit(this.handleAutoSubmit.bind(this))}>

            <Field component="input" type="hidden" name="patientId"/>

            <Row>
                <Field name="history" id="disability.personalId" component={renderArea}
                       id="disability.history" label={t("History")} outerDivClass="col-lg-12" rows={4}/>
            </Row>

            <Row>
                <Field name="treatments" id="disability.treatments" component={renderCheckboxes}
                       outerDivClass="col-lg-12"
                       checkboxes={treatments} id="disability.treatments" label={t("Treatments")}/>
            </Row>

            {otherTreatmentSelected(treatmentSelected) &&
            <Row>
                <Field id="disability.otherTreatment" label={t("Other treatment")}
                       name="otherTreatment" id="disability.otherTreatment" component={renderInput}
                       outerDivClass="col-lg-12"/>
            </Row>
            }

            <Row>
                <Field name="treatmentHistory" id="disability.treatmentHistory" component={renderArea} rows={4}
                       id="disability.treatmentHistory" label={t("Treatment history")} outerDivClass="col-lg-12"/>
            </Row>

            <Row>
                <Col lg={12}>
                    <FieldArray name="appointments" t={t} onRemoveAppointment={onRemoveAppointment}
                                component={renderAppointments} label={t("Appointments")}/>
                </Col>
            </Row>

            <InputField id="disability.barthelIndex" label={t("Barthel index")}>
                <Field name="barthelIndex" id="patient.barthelIndex" component={renderNumberInput} nbrFormat="##"/>
            </InputField>

            <InputField id="disability.latestDisabilityDesc" label={t("Latest disability description")}>
                <Field name="latestDisabilityDesc" id="disability.latestDisabilityDesc" component={renderArea}/>
            </InputField>

            <div className="form-group">
                <h4>{t("Main diagnosis")}</h4>
                <Diagnosis t={t} name="mainDiagnosis"/>
            </div>

            <div className="form-group">
                <h4>{t("Other diagnosis")}</h4>
                <FieldArray t={t} onRemoveDiagnosis={onRemoveDiagnosis} name="otherDiagnosis"
                            component={renderDiagnosis}/>
            </div>

            <InputField id="disability.disabilityTypes" label={t("Disability types")}>
                <Field name="disabilityTypes" id="disability.disabilityTypes" component={renderCheckboxes}
                       checkboxes={disabilityTypes}/>
            </InputField>

            <button className="btn" onClick={handleSubmit(values => this.handleSubmit.apply(this, [{
                disability: {...values}, pressed: 'Save'
            }]))} disabled={invalid || submitting}>{t("Save")}
            </button>
            <button className="btn" onClick={handleSubmit(values => this.handleSubmit.apply(this, [{
                disability: {...values}, pressed: 'Close'
            }]))}>{t("Close")}
            </button>
            <button className="btn" onClick={(e) => this.props.onBack(e, dirty)}>{t("Cancel")}
            </button>

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


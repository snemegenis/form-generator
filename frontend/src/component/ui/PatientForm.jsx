import React, {PropTypes} from "react";
import {Field, Form, SubmissionError} from "redux-form";
import InputMask from 'react-input-mask';
import moment from "moment";
import InputField from "./InputField.jsx";
import {trimmedEmpty, maskedInvalid} from "../../util/ValidationUtil";
import TextareaAutosize from 'react-autosize-textarea';

const MaskedInput = ({input, meta, mask}) => {
    return <div className="input-row">
        <InputMask className={"form-control " + (meta.error ? "is-invalid" : "")} mask={mask} maskChar="_"
                   value={input.value ? input.value : ""} {...input} />
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

const renderArea = ({input, meta, rows}) => {
    return <div className="input-row">
        <TextareaAutosize className={"form-control " + (meta.error ? "is-invalid" : "")}
                          value={input.value ? input.value : ""}
                          {...input} />
        {meta.error ? meta.error : ""}
    </div>;
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
        return <Form className="patient-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <InputField id="patient.personalId" label={t("Personal id") + ":"}>
                <Field name="personalId" id="patient.personalId" component={MaskedInput} mask="99999999999"/>
            </InputField>

            <InputField id="patient.birthDate" label={t("Date of birth") + ":"} defaultValue="">
                <Field name="birthDate" id="patient.birthDate" component={MaskedInput} mask="9999-99-99"/>
            </InputField>

            <InputField id="patient.firstName" label={t("First name") + ":"}>
                <Field name="firstName" id="patient.firstName"
                       className="form-control" component={renderInput}/>
            </InputField>

            <InputField id="patient.lastName" label={t("Last name") + ":"}>
                <Field name="lastName" id="patient.lastName"
                       className="form-control" component={renderInput}/>
            </InputField>
            <InputField id="patient.address" label={t("Address") + ":"}>
                <Field name="address" id="patient.address"
                       className="form-control" component={renderArea} rows="4"/>
            </InputField>
            <InputField id="patient.occupation" label={t("Occupation") + ":"}>
                <Field name="occupation" id="patient.occupation"
                       className="form-control" component={renderInput}/>
            </InputField>
            <InputField id="patient.phone" label={t("Phone") + ":"}>
                <Field name="phone" id="patient.phone"
                       className="form-control" component={MaskedInput} mask="+370-999-99999"/>
            </InputField>
            <InputField id="patient.mobilePhone" label={t("Mobile phone") + ":"}>
                <Field name="mobilePhone" id="patient.mobilePhone"
                       className="form-control" component={MaskedInput} mask="+370-999-99999"/>
            </InputField>
            <InputField id="patient.email" label={t("Email") + ":"}>
                <Field name="email" id="patient.email"
                       className="form-control" component={renderInput}/>
            </InputField>
            <InputField id="patient.employer" label={t("Employer") + ":"}>
                <Field name="employer" id="patient.employer"
                       className="form-control" component={renderInput}/>
            </InputField>
            {error && <div>{error}</div>}

            <button className="btn" type="submit" disabled={invalid}>{t("Save")}</button>
            <button className="btn" type="button" onClick={(e) => this.props.onBack(e, !pristine)}>{t("Back")}</button>
        </Form>
    }
}

PatientForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
};

export default PatientForm;


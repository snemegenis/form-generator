import React, {PropTypes} from "react";
import {Field, Form, SubmissionError} from "redux-form";
import InputField from "./InputField.jsx";
import {trimmedEmpty} from "../../util/ValidationUtil";
import {translate} from "react-i18next";

const renderInput = ({input, meta, type}) => {
    return <div className="input-row">
        <input className={"form-control " + (meta.error ? "is-invalid" : "")} value={input.value ? input.value : ""}
               type={type} {...input} />
        {meta.error ? meta.error : ""}
    </div>;
};

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    validate(credentials) {
        const {t} = this.props;
        let errors = {};
        let errorExist = false;

        if (trimmedEmpty(credentials.username)) {
            errors.username = t('Enter an username.');
            errorExist = true;
        }
        if (trimmedEmpty(credentials.password)) {
            errors.password = t('Enter a password.');
            errorExist = true;
        }

        if (errorExist) {
            throw new SubmissionError(errors);
        }
    }

    handleSubmit(credentials) {
        this.validate(credentials);
        this.props.onLogin(credentials);
    }

    render() {
        const {error, invalid, handleSubmit, t} = this.props;
        return <Form className="login-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <InputField id="credentials.username" label={t("Username") + ":"}>
                <Field name="username" id="credentials.username" type="text" component={renderInput}/>
            </InputField>

            <InputField id="credentials.password" label={t("Password") + ":"}>
                <Field name="password" id="credentials.password" type="password" component={renderInput}/>
            </InputField>

            {error && <div>{error}</div>}

            <button className="btn" type="submit" disabled={invalid}>{t("Login")}</button>
        </Form>
    }
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired
};

export default translate()(LoginForm);


import React, {PropTypes} from "react";
import {Field, Form, SubmissionError} from "redux-form";
import {trimmedEmpty} from "../../util/ValidationUtil";
import InputFieldWithError from "./InputFieldWithError.jsx";
import {Button} from "react-bootstrap";

const renderInput = ({id, label, input, meta, outerDivClass, labelClass, inputClass, type}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error}
                              outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
    <input className="form-control" value={input.value ? input.value : ""}
           type={type} {...input} />
  </InputFieldWithError>;
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
    const {invalid, handleSubmit, t} = this.props;
    return <Form className="login-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
      <Field name="username" id="credentials.username" label={t("Username") + ":"}
             type="text" component={renderInput}/>

      <Field name="password" id="credentials.password" label={t("Password") + ":"}
             type="password" component={renderInput}/>

      <Button type="submit" disabled={invalid}>{t("Login")}</Button>
    </Form>
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;


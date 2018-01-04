import React, {PropTypes} from "react";
import {Field, Form, SubmissionError} from "redux-form";
import {trimmedEmpty} from "../../util/ValidationUtil";
import {Button} from "react-bootstrap";
import Input from "./form/Input.jsx";

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
             type="text" component={Input}/>

      <Field name="password" id="credentials.password" label={t("Password") + ":"}
             type="password" component={Input}/>

      <Button type="submit" disabled={invalid}>{t("Login")}</Button>
    </Form>
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;


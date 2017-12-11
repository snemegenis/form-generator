import React, {PropTypes} from "react";
import {Field, Form, SubmissionError} from "redux-form";
import InputField from "./InputField.jsx";
import {trimmedEmpty} from "../../util/ValidationUtil";

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
    let errors = {};
    let errorExist = false;

    if (trimmedEmpty(credentials.username)) {
      errors.username = 'Enter an username.';
      errorExist = true;
    }
    if (trimmedEmpty(credentials.password)) {
      errors.password = 'Enter a password.';
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
    const {error, invalid, handleSubmit} = this.props;
    return <Form className="login-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
      <InputField id="credentials.username" label="Enter username:">
        <Field name="username" id="credentials.username" type="text" component={renderInput} />
      </InputField>

      <InputField id="credentials.password" label="Enter password:">
        <Field name="password" id="credentials.password" type="password" component={renderInput} />
      </InputField>

      {error && <div>{error}</div>}

      <button className="btn" type="submit" disabled={invalid}>Login</button>
    </Form>
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;


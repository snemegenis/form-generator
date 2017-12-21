import React, {PropTypes} from "react";

const InputFieldWithError = ({id, label, error, children}) => {
  return <div className={"form-group" + (error ? " has-error" : "")}>
    <label htmlFor={id} className="control-label">{label}</label>
    {children}
    {error ? <div className="help-block with-errors">{error}</div> : ""}

  </div>
};

InputFieldWithError.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default InputFieldWithError;

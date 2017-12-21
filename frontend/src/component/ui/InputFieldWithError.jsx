import React, {PropTypes} from "react";

const InputFieldWithError = ({id, label, labelClass, inputClass, error, children}) => {
  return <div className={"form-group" + (error ? " has-error" : "")}>
    <label htmlFor={id} className={"control-label "+ (labelClass ? labelClass : "")}>{label}</label>
    <div className={inputClass}>
      {children}
    </div>
    {error ? <div className="help-block with-errors">{error}</div> : ""}

  </div>
};

InputFieldWithError.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  error: PropTypes.string
};

export default InputFieldWithError;

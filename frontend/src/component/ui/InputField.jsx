import React, {PropTypes} from "react";

const InputField = ({id, label, children}) => {
  return <div className="form-group">
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputField;

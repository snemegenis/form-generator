import React, {PropTypes} from "react";
import InputFieldWithError from "../InputFieldWithError.jsx";

const Input = ({id, label, type, input, meta, outerDivClass, labelClass, inputClass}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error}
                              outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
    <input className="form-control" value={input.value ? input.value : ""}
           {...input} type={type} />
  </InputFieldWithError>;
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  outerDivClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string
};

export default Input;

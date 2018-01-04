import React, {PropTypes} from "react";
import InputFieldWithError from "../InputFieldWithError.jsx";
import NumberFormat from 'react-number-format';

const NumberInput = ({id, label, input, meta, nbrFormat, outerDivClass, labelClass, inputClass}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error}
                              outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
    <NumberFormat className={"form-control " + (meta.error ? "is-invalid" : "")} format={nbrFormat}
                  value={input.value ? input.value : ""} {...input} />
  </InputFieldWithError>;
};

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.object,
  nbrFormat: PropTypes.string.isRequired,
  meta: PropTypes.object,
  outerDivClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string
};

export default NumberInput;

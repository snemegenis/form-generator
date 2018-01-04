import React, {PropTypes} from "react";
import InputFieldWithError from "../InputFieldWithError.jsx";
import InputMask from 'react-input-mask';

const MaskedInput = ({id, label, input, meta, mask, outerDivClass, labelClass, inputClass}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error}
                              outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
    <InputMask className="form-control" mask={mask} maskChar="_"
               value={input.value ? input.value : ""} {...input} />
  </InputFieldWithError>
};

MaskedInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  outerDivClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string
};

export default MaskedInput;

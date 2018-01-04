import React, {PropTypes} from "react";
import InputFieldWithError from "../InputFieldWithError.jsx";
import TextareaAutosize from 'react-autosize-textarea';

const InputArea = ({id, label, rows, input, meta, outerDivClass, labelClass, inputClass}) => {
  return <InputFieldWithError id={id} label={label} error={meta.error}
                              outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
    <TextareaAutosize className="form-control" rows={rows} value={input.value ? input.value : ""}
                      {...input} />
  </InputFieldWithError>;
};

InputArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  rows: PropTypes.number,
  input: PropTypes.object,
  meta: PropTypes.object,
  outerDivClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string
};

export default InputArea;

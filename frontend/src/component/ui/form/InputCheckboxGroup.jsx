import React, {PropTypes} from "react";
import InputFieldWithError from "../InputFieldWithError.jsx";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Col, Row} from "react-bootstrap";

const InputCheckboxGroup = (props) => {
  const {id, columns, name, label, input, meta, checkboxes, outerDivClass, labelClass, inputClass} = props;
  let rows = [];
  let row = [];
  checkboxes.forEach((checkbox, index) => {
    let element = <Col key={index} lg={12 / columns}> <label className="checkbox-inline" key={"label" + index}>
      <Checkbox key={"checkbox" + index} value={checkbox.value}/>{checkbox.label}</label> </Col>;
    if (index % columns === 0) {
      row = [];
      rows.push(row)
    }
    row.push(element);
  });

  return <InputFieldWithError id={id} label={label} error={meta.error}
                              outerDivClass={outerDivClass} labelClass={labelClass} inputClass={inputClass}>
    <CheckboxGroup name={name} value={input.value ? input.value : []}
                        onChange={input.onChange}>
      {rows.map((row, index) => {
        return <Row key={index}>{row.map(element => element)}</Row>;
      })}
    </CheckboxGroup>
  </InputFieldWithError>;
};

InputCheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.number.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  checkboxes: PropTypes.array.isRequired,
  outerDivClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string
};

export default InputCheckboxGroup;
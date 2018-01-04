import React, {PropTypes} from "react";
import {Button, Glyphicon, Table} from "react-bootstrap";
import {Field} from "redux-form";
import MaskedInput from "./form/MaskedInput.jsx";
import Input from "./form/Input.jsx";
import InputArea from "./form/InputArea.jsx";

const Appointments = ({onRemoveAppointment, t, fields, meta, label}) => (
  <div className={"form-group " + (meta.error ? "has-error " : "")}>
    <label htmlFor="appointmentsTable" className="control-label">{label}</label>
    <Table id="appointmentsTable" className="appointments borderless-but-last-body">
      <thead>
      <tr>
        <th>{t("Date")}</th>
        <th>{t("Doctor type")}</th>
        <th>{t("Observation")}</th>
        <th>{t("Attachment")}</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      {fields.map((appointment, index) =>
        <tr>
          <td>
            <Field name={`${appointment}.date`}
                   component={MaskedInput} mask="9999-99-99"
                   id={`disability.appointment${index}.date`} size={10}/>
          </td>

          <td className="col-lg-2">
            <Field name={`${appointment}.doctorType`}
                   component={Input}
                   id={`disability.appointment${index}.doctorType`}/>
          </td>

          <td>
            <Field name={`${appointment}.observation`}
                   id={`disability.appointment${index}.observation`}
                   component={InputArea}/>
          </td>

          <td className="col-lg-2">
            <Field name={`${appointment}.attachment`}
                   id={`disability.appointment${index}.attachment`}
                   component={InputArea}/>
          </td>

          <td>
            <div className="form-group ">
              <Button onClick={() => onRemoveAppointment(() => fields.remove(index))}>
                <Glyphicon glyph="remove"/></Button>
            </div>
          </td>
        </tr>
      )}

      <tr>
        <td colSpan={5}><Button onClick={() => fields.push({primary: false})}>{t('Add appointment')}</Button>
        </td>
      </tr>
      </tbody>
    </Table>
    {meta.error ? <div className="help-block with-errors">{meta.error}</div> : ""}
  </div>
);

Appointments.propTypes = {
  t: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onRemoveAppointment: PropTypes.func.isRequired,
  meta: PropTypes.object,
  fields: PropTypes.object
};

export default Appointments;
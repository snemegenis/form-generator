import React, {PropTypes} from "react";
import {translate} from "react-i18next";
import {Button, ButtonToolbar, Glyphicon} from "react-bootstrap";

const Patient = (props) => {
  const {
    id, personalId, firstName, lastName, disabilityReportId, tempSaved,
    onPrint, onDisabilityAdd, onDisabilityUpdate, onUpdate, onRemove, t} = props;

  return <tr className={"contents" + (tempSaved ? " bg-warning" : "")}>
      <td>{personalId}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td className="actions">
          <ButtonToolbar>
            <Button onClick={() => onUpdate(id)}><Glyphicon glyph="edit"/> {t('Update Patient')}</Button>
            {!disabilityReportId &&
            <Button onClick={() => onDisabilityAdd(id, disabilityReportId, tempSaved)}>
              <Glyphicon glyph="plus"/> {t('Add Disability')}</Button>}
            {disabilityReportId &&
            <Button onClick={() => onDisabilityUpdate(id, disabilityReportId, tempSaved)}>
              <Glyphicon glyph="edit"/> {t('Update Disability')}</Button>}
            {disabilityReportId && <Button onClick={() => onPrint(id, firstName, lastName, tempSaved)}>
              <Glyphicon glyph="print"/> {t('Print')}</Button>}
          </ButtonToolbar>
      </td>
      <td className="delete-action">
        <Button onClick={() => onRemove(id, firstName, lastName)}><Glyphicon glyph="remove"/> {t('Remove Patient')}</Button>
      </td>
  </tr>
};

Patient.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  disabilityReportId: PropTypes.number,
  tempSaved: PropTypes.bool,
  onPrint: PropTypes.func.isRequired,
  onDisabilityAdd: PropTypes.func.isRequired,
  onDisabilityUpdate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default translate()(Patient);


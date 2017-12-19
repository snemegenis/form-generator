import React, {PropTypes} from "react";
import {translate} from "react-i18next";

const Patient = (props) => {
  const {
    id, personalId, firstName, lastName, disabilityReportId, tempSaved,
    onPrint, onDisabilityAdd, onDisabilityUpdate, onUpdate, t} = props;

  return <tr className={"contents" + (tempSaved ? " bg-warning" : "")}>
      <td>{personalId}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td className="actions">
        {!disabilityReportId &&
        <button onClick={() => onDisabilityAdd(id, disabilityReportId, tempSaved)}>{t('Add Disability')}</button>}
        {disabilityReportId &&
        <button onClick={() => onDisabilityUpdate(id, disabilityReportId, tempSaved)}>{t('Update Disability')}</button>}
        <button onClick={() => onUpdate(id)}>{t('Update patient')}</button>
        {disabilityReportId && <button onClick={() => onPrint(id, firstName, lastName)}>{t('Print')}</button>}
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
  onUpdate: PropTypes.func.isRequired
};

export default translate()(Patient);


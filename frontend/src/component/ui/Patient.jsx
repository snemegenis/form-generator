import React, {PropTypes} from "react";
import {translate} from "react-i18next";

const Patient = (props) => {
  const {
    id, personalId, firstName, lastName, disabilityReportId, tempSaved,
    onPrint, onDisabilityAdd, onDisabilityUpdate, onUpdate, t} = props;

  return <div className="patient">
    <div className={"contents" + (tempSaved ? " bg-warning" : "")}>
            <span>
                <strong>{t('Personal id')}:</strong>
                <span>{personalId}</span>
            </span>
      <span>
                <strong>First name:</strong>
                <span>{firstName}</span>
            </span>
      <span>
                <strong>Last name:</strong>
                <span>{lastName}</span>
            </span>
      <span className="actions">
        {!disabilityReportId &&
        <button onClick={() => onDisabilityAdd(id, disabilityReportId, tempSaved)}>Add Disability</button>}
        {disabilityReportId &&
        <button onClick={() => onDisabilityUpdate(id, disabilityReportId, tempSaved)}>Update Disability</button>}
        <button onClick={() => onUpdate(id)}>Update</button>
        {disabilityReportId && <button onClick={() => onPrint(id, firstName, lastName)}>Print</button>}
            </span>
    </div>
  </div>
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


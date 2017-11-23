import React, {PropTypes} from "react";

const Patient = ({id, personalId, firstName, lastName, disabilityReportId, tempSaved,
  onPrint = f => f, onDisabilityAdd = f => f, onDisabilityUpdate = f => f, onUpdate = f => f}) => {
  return <div className="patient">
    <div className="contents">
            <span>
                <strong>Personal id:</strong>
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
                <button onClick={() => onDisabilityAdd(id)}>Add Disability</button>
                <button onClick={() => onDisabilityUpdate(id)}>Update Disability</button>
                <button onClick={() => onUpdate(id)}>Update</button>
                <button disabled={!disabilityReportId} onClick={() => onPrint(id, firstName, lastName)}>Print</button>
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

export default Patient;


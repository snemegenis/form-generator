import React, {PropTypes} from "react";

const Patient = ({id, personalId, firstName, lastName, disabled, onPrint = f => f, onDisabilityAdd = f => f, onUpdate = f => f}) => {
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
                <button onClick={() => onUpdate(id)}>Update</button>
                <button disabled={disabled} onClick={() => onPrint(id, firstName, lastName)}>Print</button>
            </span>
    </div>
  </div>
};

Patient.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPrint: PropTypes.func.isRequired,
  onDisabilityAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default Patient;


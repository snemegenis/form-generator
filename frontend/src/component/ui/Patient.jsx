import React, {PropTypes} from "react";

const Patient = ({id, firstName, lastName, disabled, onClick=f=>f}) => {
    return <div className="patient">
        <div className="contents">
            <span>
                <strong>Id:</strong>
                <span>{id}</span>
            </span>
            <span>
                <strong>First name:</strong>
                <span>{firstName}</span>
            </span>
            <span>
                <strong>Last name:</strong>
                <span>{lastName}</span>
            </span>
        </div>
        <div className="actions">
            <button disabled={disabled} onClick={() => onClick(id, firstName, lastName)}>Print</button>
        </div>
    </div>
};

Patient.propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Patient;


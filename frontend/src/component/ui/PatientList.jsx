import React, {PropTypes} from 'react';
import Patient from "./Patient.jsx";


const PatientList = ({patients, loading, onPatientClick}) => {
    if (loading) {
        return <div>Data is loading</div>
    }
    if (patients.length === 0) {
        return <div className="patient-list">
            <span>No patients found</span>
        </div>
    }
    return <ul className="patient-list">
        {
            patients.map(patient =>
                <li key={patient.id} >
                    <Patient id={patient.id} firstName={patient.firstName} lastName={patient.lastName}
                             onClick={onPatientClick}/>
                </li>)
        }
    </ul>
};

PatientList.propTypes = {
    patients: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onPatientClick: PropTypes.function.isRequired
};

export default PatientList;


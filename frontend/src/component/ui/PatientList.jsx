import React, {PropTypes} from 'react';
import Patient from "./Patient.jsx";


const PatientList = ({patients, loading, onDisabilityAdd = f => f, onPrint = f => f, onAdd = f => f, onUpdate = f => f}) => {
    if (loading) {
        return <div>Data is loading</div>
    }
    if (patients.length === 0) {
        return <div className="patient-list">
            <span>No patients found</span>
        </div>
    }
    return <div>
        <ul className="patient-list">
            {
                patients.map(patient =>
                    <li key={patient.id}>
                        <Patient id={patient.id} personalId={patient.personalId}
                                 firstName={patient.firstName} lastName={patient.lastName}
                                 onPrint={onPrint}
                                 onUpdate={onUpdate}
                                 disabled={!patient.disabilityReportIds || patient.disabilityReportIds.length === 0}
                                 onDisabilityAdd={() => onDisabilityAdd(patient.id)}/>
                    </li>)
            }
        </ul>
        <div className="patient-actions">
            <button onClick={() => onAdd()}>Add</button>
        </div>
    </div>
};

PatientList.propTypes = {
    patients: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onPrint: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default PatientList;


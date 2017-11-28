import React, {PropTypes} from 'react';
import Patient from "./Patient.jsx";
import {translate} from "react-i18next";


const PatientList = ({patients, loading, onDisabilityAdd = f => f, onDisabilityUpdate = f => f,
  onPrint = f => f, onAdd = f => f, onUpdate = f => f, t}) => {
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
                                 disabilityReportId={patient.disabilityReportId}
                                 tempSaved={patient.tempSaved}
                                 onDisabilityAdd={onDisabilityAdd}
                                 onDisabilityUpdate={onDisabilityUpdate}/>
                    </li>)
            }
        </ul>
        <div className="patient-actions">
            <button onClick={() => onAdd()}>{t('Add')}</button>
        </div>
    </div>
};

PatientList.propTypes = {
    patients: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onPrint: PropTypes.func.isRequired,
    onDisabilityAdd: PropTypes.func.isRequired,
    onDisabilityUpdate: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default translate()(PatientList);


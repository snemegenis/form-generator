import React, {PropTypes} from 'react';
import Patient from "./Patient.jsx";
import {translate} from "react-i18next";


const PatientList = ({
  patients, filter, loading, onDisabilityAdd = f => f, onDisabilityUpdate = f => f,
  onPrint = f => f, onAdd = f => f, onUpdate = f => f, onShowAll = f => f, onFilter = f => f, t
}) => {
  if (loading) {
    return <div>Data is loading</div>
  }

  let filterInput;

  const onChange = () => {
    if (filterInput.value) {
      onFilter(filterInput.value);
    } else {
      onShowAll();
    }
  };

  let filteredPatients = patients;
  if (filter) {
    filteredPatients = patients.filter(patient =>
      patient.firstName.indexOf(filter) >= 0
      || patient.lastName.indexOf(filter) >= 0
      || patient.personalId.indexOf(filter) >= 0);
  }

  return <div>
    <ul className="patient-list">
      {(filteredPatients.length === 0) && <span>No patients found</span>}
      {
        filteredPatients.map(patient =>
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
      <button onClick={() => onAdd()}>{t('Add Patient')}</button>
      <button onClick={() => onFilter(filterInput.value)}>{t('Filter')}</button>
      <input ref={input => filterInput = input} defaultValue={filter ? filter : ''} onChange={onChange}/>
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
  onUpdate: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default translate()(PatientList);


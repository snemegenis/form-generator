import React, {PropTypes} from 'react';
import Patient from "./Patient.jsx";
import {translate} from "react-i18next";


const PatientList = (props) => {
  const {
    patients, filter, loading, onDisabilityAdd, onDisabilityUpdate,
    onPrint, onAdd, onUpdate, onShowAll, onFilter, t
  } = props;

  if (loading) {
    return <div>Data is loading</div>
  }

  let filterInput;

  const onShowAllClick = () => {
    filterInput.value = '';
    onShowAll();
  };

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
    <div className="panel">
      <div className="form-inline">
        <div className="form-group">
          <label className="control-panel" for="input-filter">{t('Filter by')}:</label>
          <div className="input-group">
          <input id="input-filter" type="text" className="form-control"
                 ref={input => filterInput = input} defaultValue={filter ? filter : ''} onChange={onChange} />
            {filter && <span className="input-group-btn">
          <button className="btn btn-default" onClick={onShowAllClick} >{t('Show all')}</button>
        </span>}
          </div>
        </div>
      </div>
    </div>
    <table className="patient-list table">
      <thead>
      <tr>
        <th>{t('Personal id')}</th>
        <th>{t('First name')}</th>
        <th>{t('Last name')}</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      {(filteredPatients.length === 0) && <tr><td colSpan={4}>No patients found</td></tr>}
      {
        filteredPatients.map(patient =>
          <Patient key={patient.id} id={patient.id} personalId={patient.personalId}
                   firstName={patient.firstName} lastName={patient.lastName}
                   onPrint={onPrint}
                   onUpdate={onUpdate}
                   disabilityReportId={patient.disabilityReportId}
                   tempSaved={patient.tempSaved}
                   onDisabilityAdd={onDisabilityAdd}
                   onDisabilityUpdate={onDisabilityUpdate}/>)
      }
      </tbody>
    </table>
    <div className="global-patient-actions">
      <button className="btn btn-default" onClick={() => onAdd()}>{t('Add Patient')}</button>
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


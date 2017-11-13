import React from 'react';
import {UpdateReduxPatient} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';

const UpdatePatientPage = (match) => {
  return (
    <PageTemplate>
      <div className="page-header">
        <h1>Add Patient</h1>
        <UpdateReduxPatient patientId={match.params.patientId}/>
      </div>
    </PageTemplate>
  );
};

export default UpdatePatientPage;

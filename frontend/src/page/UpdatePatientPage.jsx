import React from 'react';
import {ModifyPatient} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';

const UpdatePatientPage = (match) => {
  return (
    <PageTemplate>
      <div className="page-header">
        <h1>Update Patient</h1>
        <ModifyPatient patientId={match.params.patientId}/>
      </div>
    </PageTemplate>
  );
};

export default UpdatePatientPage;

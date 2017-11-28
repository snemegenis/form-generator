import React from 'react';
import {ModifyPatient} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';

const UpdatePatientPage = (match) => {
  return (
    <PageTemplate>
      <h1>Update Patient</h1>
      <ModifyPatient patientId={match.params.patientId}/>
    </PageTemplate>
  );
};

export default UpdatePatientPage;

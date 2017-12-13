import React from 'react';
import {ModifyPatient} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import RequireAuth from "../component/container/RequireAuth.jsx";

const UpdatePatientPage = (match) => {
  return (
    <PageTemplate>
      <h1>Update Patient</h1>
      <ModifyPatient patientId={match.params.patientId}/>
    </PageTemplate>
  );
};

export default RequireAuth(UpdatePatientPage);

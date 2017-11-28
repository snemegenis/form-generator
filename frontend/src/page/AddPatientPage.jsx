import React from 'react';
import {ModifyPatient} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';

const AddPatientPage = () => {
  return (
    <PageTemplate>
      <h1>Add Patient</h1>
      <ModifyPatient />
    </PageTemplate>
  );
};

export default AddPatientPage;

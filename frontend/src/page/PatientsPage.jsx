import React from 'react';
import PageTemplate from './PageTemplate.jsx';
import {VisiblePatients} from '../component/container/index';

const PatientsPage = () => {
  return (
    <PageTemplate>
      <VisiblePatients />
    </PageTemplate>
  );
};

export default PatientsPage;

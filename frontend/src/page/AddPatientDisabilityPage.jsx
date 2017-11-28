import React from 'react';
import {ModifyDisability} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import { withRouter } from 'react-router'

const AddPatientDisabilityPage = (match) => {
  return (
    <PageTemplate>
      <h1>Add Patient disability</h1>
      <ModifyDisability patientId={match.params.patientId}/>
    </PageTemplate>
  );
};

export default withRouter(AddPatientDisabilityPage);

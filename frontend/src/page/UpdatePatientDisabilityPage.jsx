import React from 'react';
import {ModifyDisability} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import {withRouter} from 'react-router'
import RequireAuth from "../component/container/RequireAuth.jsx";

const UpdatePatientDisabilityPage = (match) => {
  return (
    <PageTemplate>
      <h1>Update Patient disability</h1>
      <ModifyDisability patientId={match.params.patientId}
                        disabilityReportId={match.params.disabilityReportId}/>
    </PageTemplate>
  );
};

export default RequireAuth(withRouter(UpdatePatientDisabilityPage));

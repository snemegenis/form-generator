import React from 'react';
import {ModifyDisability} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import RequireAuth from "../component/container/RequireAuth.jsx";
import i18n from "../i18n/i18n"

const UpdatePatientDisabilityPage = (match) => {
  return (
    <PageTemplate header={i18n.t("Update patient disability")}>
      <ModifyDisability patientId={match.params.patientId}
                        disabilityReportId={match.params.disabilityReportId}/>
    </PageTemplate>
  );
};

export default RequireAuth(UpdatePatientDisabilityPage);

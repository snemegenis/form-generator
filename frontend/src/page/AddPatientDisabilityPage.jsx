import React from 'react';
import {ModifyDisability} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import { withRouter } from 'react-router'
import RequireAuth from "../component/container/RequireAuth.jsx";
import i18n from "../i18n/i18n"

const AddPatientDisabilityPage = (match) => {
  return (
    <PageTemplate>
      <h1>{i18n.t("Add patient disability")}</h1>
      <ModifyDisability patientId={match.params.patientId}/>
    </PageTemplate>
  );
};

export default RequireAuth(withRouter(AddPatientDisabilityPage));

import React from 'react';
import {ModifyPatient} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import RequireAuth from "../component/container/RequireAuth.jsx";
import {translate} from "react-i18next";
import i18n from "../i18n/i18n";

const UpdatePatientPage = (match) => {
  return (
    <PageTemplate>
      <h1>{i18n.t("Update patient")}</h1>
      <ModifyPatient patientId={match.params.patientId}/>
    </PageTemplate>
  );
};

export default RequireAuth(translate()(UpdatePatientPage));

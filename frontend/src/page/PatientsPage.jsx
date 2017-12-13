import React from 'react';
import PageTemplate from './PageTemplate.jsx';
import {VisiblePatients} from '../component/container/index';
import {translate} from "react-i18next";
import RequireAuth from "../component/container/RequireAuth.jsx";

const PatientsPage = (props) => {
  const { t } = props;
  return (
    <PageTemplate>
      <h1>{t('List of Patients')}</h1>
      <VisiblePatients />
    </PageTemplate>
  );
};

export default RequireAuth(translate()(PatientsPage));

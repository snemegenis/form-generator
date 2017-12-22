import React from 'react';
import PageTemplate from './PageTemplate.jsx';
import {VisiblePatients} from '../component/container/index';
import {translate} from "react-i18next";
import RequireAuth from "../component/container/RequireAuth.jsx";

const PatientsPage = (props) => {
  const { t } = props;
  return (
    <PageTemplate header={t('List of Patients')}>
      <VisiblePatients />
    </PageTemplate>
  );
};

export default RequireAuth(translate()(PatientsPage));

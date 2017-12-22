import React from 'react';
import {ModifyPatient} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import RequireAuth from "../component/container/RequireAuth.jsx";
import {translate} from "react-i18next";

const AddPatientPage = (props) => {
    const {t} = props;
  return (
    <PageTemplate header={t('Add Patient')}>
      <ModifyPatient />
    </PageTemplate>
  );
};

export default RequireAuth(translate()(AddPatientPage));

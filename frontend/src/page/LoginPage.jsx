import React from 'react';
import {Login} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';
import {translate} from "react-i18next";

const LoginPage = (props) => {
    const {t} = props;
  return (
    <PageTemplate>
      <h1>{t("Login form")}</h1>
        <Login />
    </PageTemplate>
  );
};

export default translate()(LoginPage);

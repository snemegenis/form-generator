import React from 'react';
import theme from 'reapop-theme-bootstrap';
import NotificationsSystem from 'reapop';
import {UserInfoView} from "../component/container/index";
import {Navbar, PageHeader} from "react-bootstrap";
import i18n from "../i18n/i18n";

const PageTemplate = ({header, children}) =>
  <div className="container">
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>{i18n.t('Patient disability manager')}</Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <UserInfoView/>
    </Navbar>
    <PageHeader>{header}</PageHeader>
    <NotificationsSystem theme={theme}/>
    {children}
  </div>;

export default PageTemplate;
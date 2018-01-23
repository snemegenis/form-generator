import React from 'react';
import theme from 'reapop-theme-bootstrap';
import NotificationsSystem from 'reapop';
import {UserInfoView} from "../component/container/index";
import {Navbar, PageHeader} from "react-bootstrap";
import i18n from "../i18n/i18n";
import {connect} from 'react-redux'
import Loading from 'react-loading-spinner';
import Spinner from '../component/ui/Spinner.jsx';

const PageTemplate = ({isProcessing, header, children}) =>
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
    <Loading isLoading={isProcessing} loadingClassName="loading" children={children} spinner={Spinner}/>
  </div>;

export default connect(state => ({
  isProcessing: state.patients.isProcessing || state.user.isProcessing
}), null)(PageTemplate);
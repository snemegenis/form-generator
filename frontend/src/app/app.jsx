import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import storeFactory from '../store/index.js';
import {loginAction, redirectToLoginWithMessage} from '../action/action';
import {loadPatientsAction} from '../action/action';
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import PatientsPage from '../page/PatientsPage.jsx'
import AddPatientPage from '../page/AddPatientPage.jsx'
import UpdatePatientPage from "../page/UpdatePatientPage.jsx";
import AddPatientDisabilityPage from "../page/AddPatientDisabilityPage.jsx";
import UpdatePatientDisabilityPage from "../page/UpdatePatientDisabilityPage.jsx";
import {I18nextProvider} from "react-i18next";
import i18n from "../i18n/i18n";

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import '!style-loader!css-loader!font-awesome/css/font-awesome.min.css';

import '../style/main.css';
import {setupAxiosInterceptors} from "../api/interceptor";
import LoginPage from "../page/LoginPage.jsx";
import {bindActionCreators} from "redux";

let store = storeFactory();
const history = syncHistoryWithStore(hashHistory, store);
const actions = bindActionCreators({redirectToLoginWithMessage}, store.dispatch);
setupAxiosInterceptors(() => {
  actions.redirectToLoginWithMessage('User authentication info is missing');
});

ReactDOM.render(<I18nextProvider i18n={i18n}>
  <Provider store={store}>
    <Router history={history}>
      <div className="main">
        <Route exact path="/" component={PatientsPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/patient/add" component={AddPatientPage}/>
        <Route path="/patient/:patientId/update" component={UpdatePatientPage}/>
        <Route path="/patient/:patientId/disability/add" component={AddPatientDisabilityPage}/>
        <Route path="/patient/:patientId/disability/:disabilityReportId/update"
               component={UpdatePatientDisabilityPage}/>
      </div>
    </Router>
  </Provider>
</I18nextProvider>, document.getElementById('app'));

store.dispatch(loadPatientsAction());

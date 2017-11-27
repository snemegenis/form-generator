import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import storeFactory from '../store/index.js';
import {loginAction} from '../action/action';
import {loadPatientsAction} from '../action/action';
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import PatientsPage from '../page/PatientsPage.jsx'
import AddPatientPage from '../page/AddPatientPage.jsx'
import UpdatePatientPage from "../page/UpdatePatientPage.jsx";
import AddPatientDisabilityPage from "../page/AddPatientDisabilityPage.jsx";
import UpdatePatientDisabilityPage from "../page/UpdatePatientDisabilityPage.jsx";

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import '!style-loader!css-loader!font-awesome/css/font-awesome.min.css';

import '../style/main.css';

let store = storeFactory();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(<Provider store={store}>
  <Router history={history}>
    <div className="main">
      <Route exact path="/" component={PatientsPage}/>
      <Route path="/patient/add" component={AddPatientPage}/>
      <Route path="/patient/:patientId/update" component={UpdatePatientPage}/>
      <Route path="/patient/:patientId/disability/add" component={AddPatientDisabilityPage}/>
      <Route path="/patient/:patientId/disability/:disabilityReportId/update"
             component={UpdatePatientDisabilityPage}/>
    </div>
  </Router>
</Provider>, document.getElementById('app'));

store.dispatch(loginAction('petrjon', '123'));
setTimeout(() => {
  store.dispatch(loadPatientsAction());
}, 1000);

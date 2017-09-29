import React from 'react';
import ReactDOM from 'react-dom';
import storeFactory from '../store/index.js';
import {VisiblePatients, AddPatient} from '../component/container/index';
import {loginAction} from '../action/action';
import {loadPatientsAction} from '../action/action';
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import NotificationsSystem from 'reapop';

require('../style/main.css');

let store = storeFactory();
const history = syncHistoryWithStore(hashHistory, store);

const PatientsPage = () => {
  return (
    <div>
      <NotificationsSystem/>
      <VisiblePatients />
    </div>
  );
};

const AddPatientPage = () => {
  return (
    <div>
      <NotificationsSystem/>
      <AddPatient />
    </div>
  );
};

ReactDOM.render(<Provider store={store}>
  <Router history={history}>
    <div className="main">
      <Route exact path="/" component={PatientsPage}/>
      <Route path="/patient/add" component={AddPatientPage}/>
    </div>
  </Router>
</Provider>, document.getElementById('app'));

store.dispatch(loginAction('petrjon', '123'));
setTimeout(() => {
  store.dispatch(loadPatientsAction(store.getState().user.id));
}, 1000);

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

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import '!style-loader!css-loader!font-awesome/css/font-awesome.min.css';
import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css';

import '../style/main.css';

let store = storeFactory();
const history = syncHistoryWithStore(hashHistory, store);

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

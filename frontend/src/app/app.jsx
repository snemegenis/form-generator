import {PropTypes} from 'react';
import React from 'react';
import {render} from 'react-dom';
import storeFactory from '../store/index.js';
import VisiblePatients from '../component/container/VisiblePatients.jsx';
import {loginAction} from '../action/action';
import {loadPatientsAction} from '../action/action';

require('../style/main.css');

class App extends React.Component {

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        )
    }
  componentWillUnmount() {
        this.unsubscribe();
    }

  render() {
    return (
      <div>
        <VisiblePatients />
      </div>
    );
  }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

App.childContextTypes = {
    store: PropTypes.object.isRequired
};

let store = storeFactory();
render(<App store={store}/>, document.getElementById('app'));

store.dispatch(loginAction('petrjon', '123'));
setTimeout(()=>{
    store.dispatch(loadPatientsAction(store.getState().user.id));
}, 1000);

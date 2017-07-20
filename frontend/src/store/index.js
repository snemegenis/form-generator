import {applyMiddleware, combineReducers, createStore} from 'redux';
import initialStateData from '../data/initial-state.json';
import {patients, user} from '../action/reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const logger = createLogger();

const storeFactory = (initialState = initialStateData) =>
    applyMiddleware(thunkMiddleware, logger)(createStore)(combineReducers(
        {patients, user}), initialState);


export default storeFactory;

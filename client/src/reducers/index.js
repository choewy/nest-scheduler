import { combineReducers } from 'redux';
import AuthReducer from './reducer.auth';

const AppReducer = combineReducers({ AuthReducer });

export default AppReducer;
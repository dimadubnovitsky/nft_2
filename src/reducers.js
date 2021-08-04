import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import globalReducer from './containers/App/reducer';

const createReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    global: globalReducer,
  });

export default createReducer;

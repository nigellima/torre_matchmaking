import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import skillReducer from './skillReducer';

export default combineReducers({
  errors: errorReducer,
  skill: skillReducer,
});

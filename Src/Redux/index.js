import {combineReducers} from 'redux';
import LoginReducer from './Reducers/loginReducer';

export default combineReducers({
  Logins: LoginReducer,
});

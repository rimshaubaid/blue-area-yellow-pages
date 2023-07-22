import { combineReducers } from "redux";
import errorReducer from "./errorReducers";
import authReducer from './authReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
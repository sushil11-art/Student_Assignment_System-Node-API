import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import assignmentReducer from './assignmentReducer';

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    assignments:assignmentReducer
});
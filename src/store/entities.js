import { combineReducers } from 'redux';
import authReducer from './auth';
import customReducer from './customSlice';

export default combineReducers({
    auth: authReducer,
    data: customReducer
});

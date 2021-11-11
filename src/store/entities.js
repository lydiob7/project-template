import { combineReducers } from 'redux';
import customReducer from './customSlice';

export default combineReducers({
    data: customReducer
});

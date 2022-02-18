import { combineReducers } from 'redux';
import authReducer from 'auth/store';
import entitiesReducer from './entities';
import messagesReducer from './messageSlice';
import uiReducer from './uiSlice';

export default combineReducers({
    auth: authReducer,
    entities: entitiesReducer,
    messages: messagesReducer,
    ui: uiReducer
});

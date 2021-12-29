import { combineReducers } from 'redux';
import authReducer from './auth';
import entitiesReducer from './entities';
import messagesReducer from './messageSlice';
import uiReducer from './ui';

export default combineReducers({
    auth: authReducer,
    entities: entitiesReducer,
    messages: messagesReducer,
    ui: uiReducer
});

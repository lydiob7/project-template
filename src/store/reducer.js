import { combineReducers } from 'redux';
import authReducer from './auth';
import entitiesReducer from './entities';
import uiReducer from './ui';

export default combineReducers({
    auth: authReducer,
    entities: entitiesReducer,
    ui: uiReducer
});

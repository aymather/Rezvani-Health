import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import groupReducer from './groupReducer';
import clientReducer from './clientReducer';
import retreatReducer from './retreatReducer';

export default combineReducers({
    user: authReducer,
    error: errorReducer,
    groups: groupReducer,
    clients: clientReducer,
    retreats: retreatReducer
})
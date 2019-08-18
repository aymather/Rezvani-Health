import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import groupReducer from './groupReducer';
import groupStageReducer from './groupStageReducer';
import clientReducer from './clientReducer';

export default combineReducers({
    user: authReducer,
    error: errorReducer,
    groups: groupReducer,
    groupStage: groupStageReducer,
    clients: clientReducer
})
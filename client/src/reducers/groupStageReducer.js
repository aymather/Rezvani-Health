import {
    GROUP_STAGE,
    GROUP_STAGE_LOADING,
    GROUP_STAGE_FAIL
} from '../actions/types';

const initialState = {
    isLoading: false,
    sleep: null,
    activity: null,
    readiness: null
}

export default function (state = initialState, action){
    switch(action.type){
        case GROUP_STAGE:
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        case GROUP_STAGE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GROUP_STAGE_FAIL:
            return {
                ...state,
                isLoading: false,
                sleep: null,
                readiness: null,
                activity: null
            }
        default:
            return state;
    }
}
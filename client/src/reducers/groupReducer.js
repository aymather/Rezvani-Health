import {
    GROUPS_LOADING,
    GET_GROUPS,
    GROUPS_FAIL,
    ADD_GROUP,
    ADD_GROUP_FAIL,
    REMOVE_GROUP,
    REMOVE_GROUP_FAIL
} from '../actions/types';

const initialState = {
    isLoading: false,
    groups: null
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_GROUPS:
            return {
                ...state,
                isLoading: false,
                groups: action.payload
            }
        case GROUPS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GROUPS_FAIL:
            return {
                ...state,
                isLoading: false,
                groups: null
            }
        case ADD_GROUP:
            return {
                ...state,
                isLoading: false,
                groups: [action.payload, ...state.groups]
            }
        case REMOVE_GROUP:
            return {
                ...state,
                isLoading: false,
                groups: state.groups.filter(group => group.id !== action.payload.id)
            }
        case ADD_GROUP_FAIL:
        case REMOVE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}
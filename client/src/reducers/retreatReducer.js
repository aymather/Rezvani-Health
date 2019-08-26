import {
    ADD_RETREAT,
    REMOVE_RETREAT,
    RETREATS_SUCCESS,
    SELECT_RETREAT,
    RETREATS_FAIL,
    RETREATS_LOADING
} from '../actions/types';

const initialState = {
    isLoading: false,
    retreats: null,
    selected_retreat: JSON.parse(localStorage.getItem('retreat'))
}

export default function(state = initialState, action){
    switch(action.type){
        case RETREATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                retreats: action.payload.retreats
            }
        case ADD_RETREAT:
            return {
                ...state,
                isLoading: false,
                retreats: [action.payload, ...state.retreats]
            }
        case REMOVE_RETREAT:
            return {
                ...state,
                retreats: state.retreats.filter(retreat => retreat.id !== action.payload.retreat_id)
            }
        case RETREATS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SELECT_RETREAT:
            localStorage.setItem('retreat', JSON.stringify(action.payload));
            return {
                ...state,
                selected_retreat: action.payload
            }
        case RETREATS_FAIL:
            localStorage.removeItem('retreat');
            return {
                ...state,
                retreat_id: null,
                retreats: null
            }
        default:
            return state;
    }
}
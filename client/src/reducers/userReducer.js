import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from '../actions/types';

const initialState = {
    items: [
        { id: 1, name: 'Eggs' },
        { id: 2, name: 'Milk' },
        { id: 3, name: 'Steak' },
        { id: 4, name: 'Water' }
    ]
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state
            }
        default:
            return state;
    }
}
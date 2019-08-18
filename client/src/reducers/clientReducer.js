import {
    ADD_CLIENT,
    REMOVE_CLIENT,
    CLIENTS_SUCCESS,
    CLIENTS_FAIL,
    CLIENTS_LOADING,
    CLIENT_OURA_DATA,
    OURA_NOT_AUTHORIZED,
    CLIENT_OURA_DATA_LOADING
} from '../actions/types';

const initialState = {
    isLoading: false,
    switch: true,
    clients: null
}

export default function(state = initialState, action){
    switch(action.type){
        case CLIENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                switch: false,
                ...action.payload
            }
        case CLIENTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CLIENTS_FAIL:
            return {
                ...state,
                isLoading: false,
                clients: null
            }
        case CLIENT_OURA_DATA:
            return {
                ...state,
                clients: state.clients.map(client => {
                    if(client.id === action.payload.id){
                        return {
                            ...client,
                            sleep: action.payload.sleep,
                            readiness: action.payload.readiness,
                            activity: action.payload.activity,
                            isLoading: false
                        }
                    }
                    return client;
                })
            }
        case CLIENT_OURA_DATA_LOADING:
            return {
                ...state,
                clients: state.clients.map(client => {
                    if(client.id === action.payload){
                        return {
                            ...client,
                            isLoading: true
                        }
                    }
                    return client;
                })
            }
        case OURA_NOT_AUTHORIZED:
            return {
                ...state,
                clients: state.clients.map(client => {
                    if(client.id === action.payload){
                        return {
                            ...client,
                            isLoading: false,
                            sleep: null,
                            readiness: null,
                            activity: null
                        }
                    }
                    return client;
                })
            }
        case ADD_CLIENT:
            return {
                ...state,
                isLoading: false,
                clients: [action.payload.client, ...state.clients]
            }
        case REMOVE_CLIENT:
            return {
                ...state,
                isLoading: false,
                clients: state.clients.filter(client => client.id !== action.payload.client_id)
            }
        default:
            return state;
    }
}
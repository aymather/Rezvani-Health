import {
    ADD_CLIENT,
    REMOVE_CLIENT,
    CLIENTS_SUCCESS,
    CLIENTS_FAIL,
    CLIENTS_LOADING,
    CLIENT_OURA_DATA,
    CLIENT_OURA_DATA_LOADING,
    CLIENT_OURA_FAIL,
    CLIENT_PROFILE_UPDATING,
    CLIENT_PROFILE_UPDATED,
    UPDATE_PROFILE_FAIL
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
        case CLIENT_OURA_FAIL:
            return {
                ...state,
                clients: state.clients.map(client => {
                    return {
                        ...client,
                        isLoading: false
                    }
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
        case CLIENT_PROFILE_UPDATED:
            return {
                ...state,
                clients: state.clients.map(client => {
                    if(client.id === action.payload.client.id){
                        return {
                            ...action.payload.client,
                            isLoading: false
                        }
                    }
                    return client;
                })
            }
        case CLIENT_PROFILE_UPDATING:
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
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                clients: state.clients.map(client => {
                    if(client.id === action.payload){
                        return {
                            ...client,
                            isLoading: false
                        }
                    }
                    return client;
                })
            }
        default:
            return state;
    }
}
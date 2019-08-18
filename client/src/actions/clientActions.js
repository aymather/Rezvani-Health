import axios from 'axios';
import { tokenConfig } from './authActions';
import {
    CLIENTS_LOADING,
    ADD_CLIENT,
    REMOVE_CLIENT,
    CLIENTS_SUCCESS,
    CLIENTS_FAIL,
    CLIENT_OURA_DATA,
    CLIENT_OURA_FAIL,
    OURA_NOT_AUTHORIZED,
    CLIENT_OURA_DATA_LOADING
} from './types';
import { returnErrors } from './errorActions';

export const loadClients = () => (dispatch, getState) => {
    dispatch({ type: CLIENTS_LOADING });

    const config = {
        url: '/clients',
        headers: tokenConfig(getState).headers,
        method: 'get'
    }

    axios(config)
        .then(res => {
            dispatch({
                type: CLIENTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'CLIENTS_FAIL'));
            dispatch({ type: CLIENTS_FAIL });
        })
}

export const loadClientOuraData = (access_token, day, id) => (dispatch, getState) => {
    dispatch({
        type: CLIENT_OURA_DATA_LOADING,
        payload: id
    })

    const config = {
        url: '/client-oura-data',
        headers: tokenConfig(getState).headers,
        method: 'post',
        data: { access_token, day, id }
    }

    axios(config)
        .then(res => {
            if(!res.data.sleep){
                dispatch({
                    type: OURA_NOT_AUTHORIZED,
                    payload: res.data.id
                })
            } else {
                dispatch({ 
                    type: CLIENT_OURA_DATA,
                    payload: res.data
                })
            }
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: CLIENT_OURA_FAIL });
        })
}

export const createClient = data => (dispatch, getState) => {
    dispatch({ type: CLIENTS_LOADING });

    const config = {
        url: '/new-client',
        headers: tokenConfig(getState).headers,
        method: 'post',
        data
    }

    axios(config)
        .then(res => {
            dispatch({
                type: ADD_CLIENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'CLIENTS_FAIL'))
            dispatch({ type: CLIENTS_FAIL });
        })
}

export const removeClient = client_id => (dispatch, getState) => {
    dispatch({ type: CLIENTS_LOADING });
    
    const config = {
        method: 'post',
        headers: tokenConfig(getState).headers,
        url: '/remove-client',
        data: { client_id }
    }
    
    axios(config)
        .then(res => {
            dispatch({
                type: REMOVE_CLIENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: CLIENTS_FAIL });
        })
}

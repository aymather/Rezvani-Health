import axios from 'axios';
import { getHeaders } from './authActions';
import {
    CLIENTS_LOADING,
    ADD_CLIENT,
    REMOVE_CLIENT,
    CLIENTS_SUCCESS,
    CLIENTS_FAIL,
    CLIENT_OURA_DATA,
    CLIENT_OURA_FAIL,
    CLIENT_OURA_DATA_LOADING
} from './types';
import { returnErrors } from './errorActions';

export const loadClients = () => (dispatch, getState) => {
    dispatch({ type: CLIENTS_LOADING });

    const config = {
        url: '/clients',
        headers: getHeaders(getState),
        method: 'GET'
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
        headers: getHeaders(getState),
        method: 'POST',
        data: { access_token, day, id }
    }

    axios(config)
        .then(res => {
            dispatch({ 
                type: CLIENT_OURA_DATA,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: CLIENT_OURA_FAIL });
        })
}

export const createClient = (data, history) => (dispatch, getState) => {
    dispatch({ type: CLIENTS_LOADING });

    const config = {
        url: '/new-client',
        headers: getHeaders(getState),
        method: 'POST',
        data
    }

    axios(config)
        .then(res => {
            dispatch({
                type: ADD_CLIENT,
                payload: res.data
            })
            history.push('/new-client/success', res.data);
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'CLIENTS_FAIL'))
            dispatch({ type: CLIENTS_FAIL });
        })
}

export const removeClient = (client_id, history) => (dispatch, getState) => {
    dispatch({ type: CLIENTS_LOADING });
    
    const config = {
        method: 'POST',
        headers: getHeaders(getState),
        url: '/remove-client',
        data: { client_id }
    }
    
    axios(config)
        .then(res => {
            dispatch({
                type: REMOVE_CLIENT,
                payload: res.data
            })
            history.push('/');
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: CLIENTS_FAIL });
        })
}

export const sendEmail = (auth_uri, email) => (dispatch, getState) => {
    const config = {
        method: 'GET',
        url: '/send-email',
        headers: getHeaders(getState)
    }

    config.headers['x-auth-uri'] = auth_uri;
    config.headers['email'] = email;

    axios(config)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

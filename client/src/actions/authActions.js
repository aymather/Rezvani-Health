import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types';

// Check token & load user
export const loadUser = (history) => (dispatch, getState) => {

    // User loading
    dispatch({ type: USER_LOADING });

    const config = {
        url: '/user',
        method: 'GET',
        headers: getHeaders(getState)
    }

    if(config.headers.retreat_id.length === 0) history.push('/retreats');

    // Make request to backend api
    axios(config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR });
        })
}

// Log user out
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
}

// Log user in
export const login = password => dispatch => {
    dispatch({ type: USER_LOADING });

    const config = {
        method: 'POST',
        url: '/login',
        headers: { 'Content-Type': 'application/json' },
        data: { password }
    }

    axios(config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({ type: LOGIN_FAIL });
        })
}

export const getHeaders = (getState) => {
    // Get token from state
    const token = getState().user.token;

    // Get the current retreat from state
    const retreat_id = getState().retreats.selected_retreat ? getState().retreats.selected_retreat.id : null
    
    return {
        "x-auth-token": token,
        "Content-Type": "application/json",
        "retreat_id": retreat_id ? retreat_id : ''
    };
}
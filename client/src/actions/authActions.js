import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({ type: USER_LOADING });

    // Make request to backend api
    axios.get('/user', tokenConfig(getState))
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
export const login = ({ username, password }) => dispatch => {
    dispatch({ type: USER_LOADING });

    const config = {
        method: 'post',
        url: '/login',
        headers: { 'Content-Type': 'application/json' },
        data: {
            username,
            password
        }
    }

    axios(config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            if(err.response){
                dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            } else {
                console.log(err);
            }
            dispatch({ type: LOGIN_FAIL });
        })
}

// Register a new user
export const register = ({ firstname, lastname, username, email, password, password2}) => dispatch => {

    dispatch({ type: USER_LOADING });

    const config = {
        method: 'post',
        url: '/register',
        headers: { "Content-Type": "application/json" },
        data: {
            firstname,
            lastname,
            username,
            email,
            password,
            password2
        }
    }

    // Send request to server
    axios(config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({ type: REGISTER_FAIL });
        })

}

export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().user.token;

    // Header
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // If token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}
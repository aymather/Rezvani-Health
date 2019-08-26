import axios from 'axios';
import { returnErrors } from './errorActions';
import { getHeaders } from './authActions';
import {
    ADD_RETREAT,
    REMOVE_RETREAT,
    RETREATS_SUCCESS,
    SELECT_RETREAT,
    RETREATS_FAIL,
    RETREATS_LOADING
} from './types';

export const loadRetreats = () => (dispatch, getState) => {
    dispatch({ type: RETREATS_LOADING });

    const config = {
        method: 'GET',
        url: '/retreats',
        headers: getHeaders(getState)
    }
    
    axios(config)
        .then(res => {
            dispatch({
                type: RETREATS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: RETREATS_FAIL });
        })
}

export const removeRetreat = id => (dispatch, getState) => {
    const config = {
        method: 'POST',
        url: '/remove-retreat',
        headers: getHeaders(getState),
        data: { retreat_id: id }
    }

    axios(config)
        .then(res => {
            dispatch({
                type: REMOVE_RETREAT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: RETREATS_FAIL });
        })
}

export const addRetreat = name => (dispatch, getState) => {
    const config = {
        method: 'POST',
        url: '/add-retreat',
        headers: getHeaders(getState),
        data: { name }
    }

    axios(config)
        .then(res => {
            dispatch({
                type: ADD_RETREAT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: RETREATS_FAIL });
        })
}

export const selectRetreat = (retreat, history) => (dispatch) => {
    dispatch({
        type: SELECT_RETREAT,
        payload: retreat
    });

    history.push('/');
}
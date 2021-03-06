import axios from 'axios';
import {
    GET_GROUPS,
    GROUPS_LOADING,
    GROUPS_FAIL,
    ADD_GROUP,
    REMOVE_GROUP,
    ADD_GROUP_FAIL,
    REMOVE_GROUP_FAIL
} from './types';
import { returnErrors } from './errorActions';
import { getHeaders } from './authActions';

export const loadGroups = () => (dispatch, getState) => {
    dispatch({ type: GROUPS_LOADING });

    const config = {
        method: 'GET',
        url: '/getgroups',
        headers: getHeaders(getState)
    }

    axios(config)
        .then(res => {
            dispatch({
                type: GET_GROUPS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: GROUPS_FAIL });
        })
}

export const addGroup = group_name => (dispatch, getState) => {
    dispatch({ type: GROUPS_LOADING });

    const config = {
        method: 'POST',
        url: '/addgroup',
        headers: getHeaders(getState),
        data: { group_name }
    }

    axios(config)
        .then(res => {
            dispatch({
                type: ADD_GROUP,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: ADD_GROUP_FAIL });
        })

}

export const removeGroup = (group_id, history) => (dispatch, getState) => {
    const config = {
        method: 'POST',
        url: '/removegroup',
        headers: getHeaders(getState),
        data: { group_id }
    }

    axios(config)
        .then(res => {
            dispatch({
                type: REMOVE_GROUP,
                payload: res.data
            })
            history.push('/');
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: REMOVE_GROUP_FAIL });
        })

}

export const editGroupMembers = (group_id, member_status) => (dispatch, getState) => {
    dispatch({ type: GROUPS_LOADING });

    var config = {
        method: 'POST',
        url: '/editGroupMembers',
        headers: getHeaders(getState),
        data: {
            member_status,
            group_id
        }
    }

    axios(config)
        .then(() => {
            config.method = 'GET';
            config.url = '/getgroups';
            delete config.data;
            axios(config)
                .then(res => {
                    dispatch({
                        type: GET_GROUPS,
                        payload: res.data
                    })
                })
                .catch(err => {
                    dispatch(returnErrors(err.response.data, err.response.status));
                    dispatch({ type: GROUPS_FAIL });
                })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: GROUPS_FAIL });
        })
}
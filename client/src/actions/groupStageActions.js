import { tokenConfig } from './authActions';
import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    GROUP_STAGE,
    GROUP_STAGE_LOADING,
    GROUP_STAGE_FAIL
} from './types';

export const loadGroupStage = group_id => (dispatch, getState) => {
    dispatch({ type: GROUP_STAGE_LOADING });
    
    const config = {
        method: 'post',
        url: '/groupStage',
        headers: tokenConfig(getState).headers,
        data: { group_id }
    }
    
    axios(config)
        .then(res => {
            dispatch({
                type: GROUP_STAGE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: GROUP_STAGE_FAIL });
        })

}
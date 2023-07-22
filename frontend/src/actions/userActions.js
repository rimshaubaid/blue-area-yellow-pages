import axios from 'axios';
import {
    GET_ERRORS,
    USER_ADD,
    USER_UPDATE,
    USER_DELETE
} from './types';

export const addUser = (userData) => dispatch => {
    axios.post('/api/users/register',userData)
    .then(res => 
        dispatch({
            type:USER_ADD,
            payload:res,
        }))
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
        );
};

export const deleteUser = (userData) => dispatch => {
    axios.post('/api/users/delete',userData)
    .then(res => 
        dispatch({
            type:USER_DELETE,
            payload:res,
        }))
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            }));
};
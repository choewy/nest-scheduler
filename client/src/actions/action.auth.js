import axios from 'axios';
import { AUTH_USER, SIGNIN_USER, SIGNOUT_USER, SIGNUP_USER } from './action.types';
import { AUTH_SERVER } from '../configs/server.config'

export const signUpUser = async (body) => {
    const response = await axios.post(`${AUTH_SERVER}/signup`, body);

    return {
        type: SIGNUP_USER,
        payload: response.data
    };
};

export const signInUser = async (body) => {
    const response = await axios.post(`${AUTH_SERVER}/signin`, body);

    return {
        type: SIGNIN_USER,
        payload: response.data
    };
};

export const signOutUser = async () => {
    const response = await axios.get(`${AUTH_SERVER}/signout`);

    return {
        type: SIGNOUT_USER,
        payload: response.data
    };
};

export const authUser = async () => {
    const response = await axios.get(`${AUTH_SERVER}/`);

    return {
        type: AUTH_USER,
        payload: response.data
    };
};
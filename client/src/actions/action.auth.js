import axios from 'axios';
import { AUTH_USER, SIGNIN_USER, SIGNOUT_USER, SIGNUP_USER } from './action.types';
import { AUTH_SERVER } from '../configs/server.config'

// 인증 상태 요청 GET /api/auth
export const authUser = async () => {
    const response = await axios.get(`${AUTH_SERVER}/`);

    return {
        type: AUTH_USER,
        payload: response.data
    };
};

// 회원가입 요청 POST /api/auth/signup
export const signUpUser = async (body) => {
    const response = await axios.post(`${AUTH_SERVER}/signup`, body);

    return {
        type: SIGNUP_USER,
        payload: response.data
    };
};

// 로그인 요청 POST /api/auth/signin
export const signInUser = async (body) => {
    const response = await axios.post(`${AUTH_SERVER}/signin`, body);

    return {
        type: SIGNIN_USER,
        payload: response.data
    };
};

// 로그아웃 요청 DELETE /api/auth/signout
export const signOutUser = async () => {
    const response = await axios.get(`${AUTH_SERVER}/signout`);

    return {
        type: SIGNOUT_USER,
        payload: response.data
    };
};
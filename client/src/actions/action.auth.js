import axios from 'axios';

export const authUser = async () => {
    const { data } = await axios.get('/api/auth');
    const { auth, user, message } = data;
    return { auth, user, message };
};

export const signUpUser = async (body) => {
    const { data } = await axios.post('/api/auth/signup', body);
    const { ok, message } = data;
    return { ok, message };
};

export const signInUser = async (body) => {
    const { data } = await axios.post('/api/auth/signin', body);
    const { ok, message } = data;
    return { ok, message };
};

export const signOutUser = async () => {
    const data = await axios.delete('/api/auth/signout');
    const { ok } = data;
    return { ok };
};
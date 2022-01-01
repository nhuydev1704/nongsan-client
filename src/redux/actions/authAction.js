import { postDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';
import axios from 'axios';
export const TYPES = {
    AUTH: 'AUTH',
};

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: 'LOADING', payload: true });

        const res = await postDataAPI('login', { email: data.username, password: data.password });

        if (res.status === 200) {
            dispatch({ type: 'AUTH', payload: { token: res.data.access_token, user: res.data.user } });
            localStorage.setItem('firstLogin', true);
            GetNotification(res.data.msg);
        }
        dispatch({ type: 'LOADING', payload: false });
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

// create function register
export const register = (data) => async (dispatch) => {
    const { re_password, showPassword, showRePassword, ...rest } = data;
    try {
        dispatch({ type: 'LOADING', payload: true });
        // call api register
        const res = await postDataAPI('register', rest);
        // if success
        if (res.status === 200) {
            dispatch({ type: 'AUTH', payload: { token: res.data.access_token, user: res.data.user } });
            localStorage.setItem('firstLogin', true);
            GetNotification(res.data.msg);
        }
        dispatch({ type: 'LOADING', payload: false });
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

// create function logout
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: 'LOADING', payload: true });
        // call api logout
        const res = await postDataAPI('logout');
        // if success
        if (res.status === 200) {
            localStorage.removeItem('firstLogin');
            window.location.href = '/';
        }
        dispatch({ type: 'LOADING', payload: false });
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
        dispatch({ type: 'LOADING', payload: true });
        try {
            const res = await postDataAPI('refresh_token');
            if (res.status === 200) {
                dispatch({ type: 'AUTH', payload: { token: res.data.access_token, user: res.data.user } });
            }
            dispatch({ type: 'LOADING', payload: false });
        } catch (err) {
            dispatch({ type: 'LOADING', payload: false });
            GetNotification(err.response.data.msg, 'error');
        }
    }
};

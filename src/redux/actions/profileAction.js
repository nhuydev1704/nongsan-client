import { getDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';

export const TYPES = {
    GET_USER: 'GET_USER',
};

export const getProfileUsers = (users, id, token) => async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
        try {
            dispatch({ type: 'LOADING', payload: true });
            const res = await getDataAPI(`user/${id}`, token);
            if (res.status === 200) {
                dispatch({ type: TYPES.GET_USER, payload: res.data });
            }
            setTimeout(() => {
                dispatch({ type: 'LOADING', payload: false });
            }, 2000);
        } catch (err) {
            dispatch({ type: 'LOADING', payload: false });
            GetNotification(err.response.data.msg, 'error');
        }
    }
};

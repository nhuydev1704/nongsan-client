import { getDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';

export const TYPES = {
    GET_ALL_CATEGORIES: 'GET_ALL_CATEGORIES',
};

export const getCategories = () => async (dispatch) => {
    try {
        const res = await getDataAPI('category');
        if (res.status === 200) {
            dispatch({ type: TYPES.GET_ALL_CATEGORIES, payload: res.data });
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

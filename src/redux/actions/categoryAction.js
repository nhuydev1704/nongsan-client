import { getDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';
export const TYPES = {
    GET_ALL_CATEGORIES: 'GET_ALL_CATEGORIES',
    FIND_CATEGORY: 'FIND_CATEGORY',
    CLEAR_SORT: 'CLEAR_SORT',
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

export const findCategory =
    (id, title = '') =>
    (dispatch) => {
        dispatch({ type: TYPES.FIND_CATEGORY, payload: { id, title } });
    };

export const clearSort = (isClear) => (dispatch) => {
    dispatch({ type: TYPES.CLEAR_SORT, payload: isClear });
};

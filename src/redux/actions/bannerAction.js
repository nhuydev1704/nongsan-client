import { getDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';
export const TYPES = {
    GET_BANNERS: 'GET_BANNERS',
    UPDATE_TITLE: 'UPDATE_TITLE',
};

export const getBanners = () => async (dispatch) => {
    try {
        const res = await getDataAPI('banner');
        if (res.status === 200) {
            dispatch({ type: TYPES.GET_BANNERS, payload: res.data });
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

export const updateBanner = (title) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.UPDATE_TITLE, payload: title });
    } catch (err) {
        GetNotification(err.response.data.msg, 'error');
    }
};

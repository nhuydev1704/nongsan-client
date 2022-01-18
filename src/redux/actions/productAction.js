import { getDataAPI, putDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';

export const TYPES = {
    GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
};

export const getProducts = () => async (dispatch) => {
    try {
        const res = await getDataAPI('product');
        if (res.status === 200) {
            dispatch({ type: TYPES.GET_ALL_PRODUCTS, payload: res.data });
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

export const updateProduct = (id, color) => async (dispatch) => {
    try {
        const res = await putDataAPI(`product/${id}`, { color });
        if (res.status === 200) {
            dispatch({ type: TYPES.UPDATE_PRODUCT, payload: res.data.product });
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

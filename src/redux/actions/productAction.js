import { getDataAPI, putDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';

export const TYPES = {
    GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
};

export const getProducts =
    (page = 1, category = '', child_category = '', isNav = true, sort = '', search = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: 'LOADING', payload: true });

            const res = await getDataAPI(
                `product?limit=${page * 8}&${category}&${child_category}&${sort}&title[regex]=${search}`
            );
            if (res.status === 200) {
                dispatch({ type: TYPES.GET_ALL_PRODUCTS, payload: { ...res.data, isNav } });
            }

            setTimeout(() => {
                dispatch({ type: 'LOADING', payload: false });
            }, 2000);
        } catch (err) {
            dispatch({ type: 'LOADING', payload: false });
            GetNotification(err.response.data.msg, 'error');
        }
    };

export const updateProduct = (id, color) => async (dispatch) => {
    try {
        const res = await putDataAPI(`product/${id}`, { color: color.color, textColor: color.textColor });
        if (res.status === 200) {
            dispatch({ type: TYPES.UPDATE_PRODUCT, payload: res.data.product });
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

import { getDataAPI, postDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';
export const TYPES = {
    GET_PAYMENT: 'GET_PAYMENT',
};

export const getPayments = () => async (dispatch) => {
    try {
        const res = await getDataAPI('payment');
        if (res.status === 200) {
            dispatch({ type: TYPES.GET_PAYMENT, payload: res.data });
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

export const createPayment = (payments) => async (dispatch) => {
    try {
        const res = await postDataAPI('payment', payments);
        if (res.status === 200) {
            GetNotification(res.data.msg, 'success');
            dispatch({ type: 'DE_CART', payload: [] });
            return true;
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

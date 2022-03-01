import { getDataAPI, putDataAPI } from '../../api/fetchData';
import { isNumber } from '../../utils/common';
import GetNotification from '../../utils/GetNotification';

export const TYPES = {
    GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
    GET_FULL_PRODUCTS: 'GET_FULL_PRODUCTS',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    UPDATE_PAGE: 'UPDATE_PAGE',
    SEARCH_PRODUCT: 'SEARCH_PRODUCT',
    CHECK_SEARCH: 'CHECK_SEARCH',
    FIND_PRODUCT_DISCOUNT: 'FIND_PRODUCT_DISCOUNT',
};

export const getProducts =
    (page = 1, category = '', child_category = '', isNav = false, sort = '', search = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: TYPES.UPDATE_PAGE, payload: false });
            dispatch({ type: 'LOADING', payload: true });
            let res;
            let params = '';
            if (sort) {
                params = sort;
                res = await getDataAPI(sort);
            } else {
                params = !isNumber(page)
                    ? page
                    : `product?limit=${8}&${category}&${child_category}&sort&title[regex]=${search}`;
                res = await getDataAPI(
                    !isNumber(page)
                        ? page
                        : `product?limit=${page * 8}&${category}&${child_category}&${sort}&title[regex]=${search}`
                );
            }

            if (res.status === 200) {
                dispatch({
                    type: TYPES.GET_ALL_PRODUCTS,
                    payload: {
                        ...res.data,
                        isNav,
                        params,
                    },
                });
            }

            setTimeout(() => {
                dispatch({ type: 'LOADING', payload: false });
            }, 2000);
        } catch (err) {
            dispatch({ type: 'LOADING', payload: false });
            GetNotification(err.response.data.msg, 'error');
        }
    };

export const searchProduct = (value) => async (dispatch) => {
    try {
        // const res = await getDataAPI(url);
        dispatch({
            type: TYPES.SEARCH_PRODUCT,
            payload: value,
        });
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
        console.log('🚀 ~ file: productAction.js ~ line 77 ~ updateProduct ~ err', err?.response);
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err?.response?.data?.msg, 'error');
    }
};

export const updateIsSearch = (isSearch) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.CHECK_SEARCH, payload: isSearch });
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

export const findProductDiscount = (id) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.FIND_PRODUCT_DISCOUNT, payload: id });
    } catch (err) {
        GetNotification(err.response.data.msg, 'error');
    }
};

export const getFullProduct = () => async (dispatch) => {
    try {
        const res = await getDataAPI('all_pro');
        if (res.status === 200) {
            dispatch({ type: TYPES.GET_FULL_PRODUCTS, payload: res.data.products });
        }
    } catch (err) {
        dispatch({ type: 'LOADING', payload: false });
        GetNotification(err.response.data.msg, 'error');
    }
};

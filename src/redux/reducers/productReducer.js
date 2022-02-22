import { TYPES } from '../actions/productAction';

const initialState = {
    result: 0,
    products: [],
    isNav: false,
    params: '',
    defaultPage: false,
    isSearch: false,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_ALL_PRODUCTS:
            return {
                ...state,
                result: action.payload.result,
                products: action.payload.products,
                isNav: action.payload.isNav,
                params: action.payload.params,
            };

        case TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products.map((product) => {
                        if (product._id === action.payload._id) {
                            return action.payload;
                        }
                        return product;
                    }),
                ],
            };
        case TYPES.UPDATE_PAGE:
            return {
                ...state,
                defaultPage: action.payload,
            };
        case TYPES.CHECK_SEARCH:
            return {
                ...state,
                isSearch: action.payload,
            };

        case TYPES.SEARCH_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;

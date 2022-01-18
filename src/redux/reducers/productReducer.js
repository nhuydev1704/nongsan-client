import { TYPES } from '../actions/productAction';

const initialState = {
    result: 0,
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_ALL_PRODUCTS:
            return {
                ...state,
                result: action.payload.result,
                products: action.payload.products,
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

        default:
            return state;
    }
};

export default productReducer;

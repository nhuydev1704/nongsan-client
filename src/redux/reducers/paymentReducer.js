import { TYPES } from '../actions/paymentAction';

const initialState = {
    payment: [],
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_PAYMENT:
            return {
                ...state,
                payment: action.payload,
            };

        default:
            return state;
    }
};

export default paymentReducer;

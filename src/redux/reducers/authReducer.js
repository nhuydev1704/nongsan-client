import { TYPES } from '../actions/authAction';

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.AUTH:
            return { ...state, ...action.payload, cart: action.payload.user.cart };

        case TYPES.CART:
            return { ...state, cart: [...state.cart, action.payload] };

        case TYPES.DE_CART:
            return { ...state, cart: [...action.payload] };

        default:
            return state;
    }
};

export default authReducer;

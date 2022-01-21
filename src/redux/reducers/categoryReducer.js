import { TYPES } from '../actions/categoryAction';

const initialState = {
    category: [],
    children: {
        title: 'Trang chủ',
    },
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_ALL_CATEGORIES:
            return {
                ...state,
                category: action.payload,
            };
        case TYPES.FIND_CATEGORY:
            return {
                ...state,
                children: action.payload.id
                    ? {
                          ...[...state.category].find((category) => category._id === action.payload.id),
                          title: action.payload.title,
                      }
                    : { title: action.payload.title },
            };
        default:
            return state;
    }
};

export default categoryReducer;

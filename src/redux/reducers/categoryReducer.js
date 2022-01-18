import { TYPES } from '../actions/categoryAction';

const initialState = [];

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_ALL_CATEGORIES:
            return action.payload;

        default:
            return state;
    }
};

export default categoryReducer;

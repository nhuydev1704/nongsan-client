import { TYPES } from '../actions/loadingAction';

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case TYPES.LOADING:
            return action.payload;

        default:
            return state;
    }
};

export default loadingReducer;

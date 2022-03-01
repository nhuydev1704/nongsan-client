import { TYPES } from '../actions/bannerAction';

const initialState = {
    banner: [],
    title: '',
};

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_BANNERS:
            return {
                ...state,
                banner: action.payload,
            };
        case TYPES.UPDATE_TITLE:
            return {
                ...state,
                title: action.payload,
            };

        default:
            return state;
    }
};

export default bannerReducer;

import { combineReducers } from 'redux';
import auth from './authReducer';
import loading from './loadingReducer';
import profile from './profileReducer';
import category from './categoryReducer';
import products from './productReducer';

export default combineReducers({
    auth,
    loading,
    profile,
    category,
    products,
});

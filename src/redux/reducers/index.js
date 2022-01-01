import { combineReducers } from 'redux';
import auth from './authReducer';
import loading from './loadingReducer';
export default combineReducers({
    auth,
    loading,
});

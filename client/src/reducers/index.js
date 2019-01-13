import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import adventureReducer from './adventureReducer';
import filterReducer from './filterReducer';
import messageReducer from './messageReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    adventure: adventureReducer,
    message: messageReducer,
    filters: filterReducer,
}); 
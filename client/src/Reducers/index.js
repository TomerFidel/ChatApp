import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    users: usersReducer,
    chat: chatReducer
});
import { combineReducers } from 'redux';
//? Import individual reducers here 
import { userReducer } from './user/reducer';

const rootReducer =  combineReducers({
    //? Place combined reducers into this object
    User: userReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
//? Import individual reducers here 
import { userReducer } from './user/reducer';
import { fileReducer } from './files/reducer';

const rootReducer =  combineReducers({
    //? Place combined reducers into this object
    User: userReducer,
    Files: fileReducer
});

export default rootReducer;
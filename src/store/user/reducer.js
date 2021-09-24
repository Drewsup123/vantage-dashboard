import { LOGOUT } from "./actions";

const initialState = {
    access_token : "",
    userName : "",
    userId : "",
    isAuthenticated: false
};

export function userReducer(state = initialState, action){
    switch(action.type){
        case LOGOUT:
            return {...state, isAuthenticated: false};
        default:
            return state;
    }
}
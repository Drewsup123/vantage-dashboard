import { LOGIN, LOGOUT } from "./actions";

const initialState = {
    accessToken : "",
    username : "",
    uid : "",
    isAuthenticated: false,
    email: "",
    phoneNumber: "",
    photoUrl: ""
};

export function userReducer(state = initialState, action){
    switch(action.type){
        case LOGIN:
            return { ...state, ...action.payload, isAuthenticated: true };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
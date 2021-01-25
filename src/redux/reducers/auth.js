import {SET_AUTH, SET_LOGIN_ERROR, SET_SIGN_UP_ERROR, SET_USER_ID, SET_FULL_NAME} from "../constants/action-types";

const initialState = {
    isAuth: false,
    userId: null,
    fullName: null,
    loginError: null,
    signUpError: null
};

export default function auth (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            state.isAuth = action.payload;
        return state;

        case SET_USER_ID:
            state.userId = action.payload;
        return state;

        case SET_FULL_NAME:
            state.fullName = action.payload;
        return state;

        case SET_LOGIN_ERROR:
            state.loginError = action.payload;
        return state;

        case SET_SIGN_UP_ERROR:
            state.signUpError = action.payload;
        return state;

        default:
        return state
    }
};

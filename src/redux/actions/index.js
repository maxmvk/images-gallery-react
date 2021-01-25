import { authApi, imagesApi } from "../../services/api";
import {
    SET_AUTH,
    SET_LOGIN_ERROR,
    SET_SIGN_UP_ERROR,
    SET_USER_ID,
    SET_PAGE, 
    SET_FILTER,
    SET_TOTAL_COUNT,
    SET_IMAGES,
    SET_FULL_NAME
} from "../constants/action-types";

export const setAuth = (payload) => ({type: SET_AUTH, payload});
export const setUserId = (payload) => ({type: SET_USER_ID, payload});
export const setFullName = (payload) => ({type: SET_FULL_NAME, payload});
export const setLoginError = (payload) => ({type: SET_LOGIN_ERROR, payload});
export const setSignUpError = (payload) => ({type: SET_SIGN_UP_ERROR, payload});
export const setPage = (payload) => ({type: SET_PAGE, payload});
export const setFilter = (payload) => ({type: SET_FILTER, payload});
export const setTotalCount = (payload) => ({type: SET_TOTAL_COUNT, payload});
export const setImages = (payload) => ({type: SET_IMAGES, payload});

export const login = (state) => (dispatch) => {
    authApi.login(state)
        .then(res => {
            console.log(res)
            localStorage.setItem("access_token", res.data.data.access_token);
            dispatch(setUserId(res.data.data.user.id));
            dispatch(setAuth(true));
            dispatch(setFullName(res.data.data.user.first_name + " " + res.data.data.user.last_name))
        })
        .catch(err => {
            dispatch(setLoginError(err.response?.data.message));
        })
};

export const register = (state, history) => (dispatch) => {
    authApi.register(state)
        .then(res => {
            dispatch(setSignUpError(null));
            history.push(`/login`)
        })
        .catch(err => {
            dispatch(setSignUpError(err.response?.data.message));
        })
};

export const getUser = () => (dispatch) => {
    authApi.getAccount()
        .then(res => {
            console.log(res)
            dispatch(setAuth(true));
            dispatch(setUserId(res.data.data.id));
            dispatch(setFullName(res.data.data.first_name + " " + res.data.data.last_name))
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch(setLoginError(err.response?.data.message));
            }
            console.log(err.response?.data.message);
        })
};

export const getImages = (filter, page, userId="") => (dispatch) => {
    imagesApi.getImages(filter, page, userId)
        .then(res => {
            console.log(res)
            dispatch(setImages(res.data.data));
            dispatch(setTotalCount(Math.ceil(res.data.meta.total? res.data.meta.total/res.data.meta.per_page: 1)));
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch(setLoginError(err.response?.data.message));
            }
            console.log(err.response?.data.message);
        })
};

export const addImage = (title, image, history) => (dispatch) => {
    imagesApi.addImage(title, image)
        .then(res => {
            console.log(res)
            history.push(`/my-images`)
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch(setLoginError(err.response?.data.message));
            }
            console.log(err.response?.data.message);
        })
};

export const updateImage = (title, image, id, history) => (dispatch) => {
    imagesApi.updateImage(title, image, id)
        .then(res => {
            console.log(res)
            history.push(`/my-images`)
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch(setLoginError(err.response?.data.message));
            }
            console.log(err.response?.data.message);
        })
};

export const deleteImage = (id, userId) => (dispatch) => {
    imagesApi.deleteImage(id)
        .then(res => {
            console.log(res)
            dispatch(getImages(1, 1, userId));
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch(setLoginError(err.response?.data.message));
            }
            console.log(err.response?.data.message);
        })
};
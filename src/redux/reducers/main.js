import {SET_PAGE, SET_FILTER, SET_TOTAL_COUNT, SET_IMAGES} from "../constants/action-types";

const initialState = {
    images: [],
    page: 1,
    filter: 1,
    totalCount: 1
};

export default function main (state = initialState, action) {
    switch (action.type) {
        case SET_IMAGES:
            state.images = action.payload;
        return state;

        case SET_PAGE:
            state.page = action.payload;
        return state;

        case SET_FILTER:
            state.filter = action.payload;
        return state;

        case SET_TOTAL_COUNT:
            state.totalCount = action.payload;
        return state;

        default:
        return state
    }
};

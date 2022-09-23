import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    news: {
        isFetching: false,
        newsCurrent: null,
        error: false,
    },
};
const homeSlice = createSlice({
    name: ' home',
    initialState,
    reducers: {
        getNewsStart: (state) => {
            state.news.isFetching = true;
        },
        getNewsCurrent: (state, action) => {
            state.news.newsCurrent = action.payload;
            state.news.isFetching = false;
            state.news.error = false;
        },
        getNewsFailed: (state) => {
            state.news.isFetching = false;
            state.news.error = true;
        },
    },
});
export const { getNewsStart, getNewsCurrent, getNewsFailed } = homeSlice.actions;
export default homeSlice.reducer;

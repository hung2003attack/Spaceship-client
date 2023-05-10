import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    news: {
        isFetching: false,
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
        getNewsEnd: (state) => {
            state.news.isFetching = false;
            state.news.error = false;
        },
        setNewsStart: (state) => {
            state.news.isFetching = true;
        },
        setNewsEnd: (state) => {
            state.news.isFetching = false;
            state.news.error = false;
        },
        getNewsFailed: (state) => {
            state.news.isFetching = false;
            state.news.error = true;
        },
    },
});
export const { getNewsStart, getNewsEnd, setNewsStart, setNewsEnd, getNewsFailed } = homeSlice.actions;
export default homeSlice.reducer;

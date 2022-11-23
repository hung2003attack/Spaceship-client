import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    setting: boolean;
    personalPage: boolean;
    login: {
        error: boolean;
    };
    register: {
        error: boolean;
        Successful: boolean;
    };
}
const initialState: InitialState = {
    setting: false,
    personalPage: false,
    login: {
        error: false,
    },
    register: {
        error: false,
        Successful: false,
    },
};
const hideShowSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onsettingOpacity: (state) => {
            state.setting = true;
        },
        offsettingOpacity: (state) => {
            state.setting = false;
        },
        onPersonalPage: (state) => {
            state.personalPage = true;
        },
        offPersonalPage: (state) => {
            state.personalPage = false;
        },
    },
});
export const { onsettingOpacity, offsettingOpacity, onPersonalPage, offPersonalPage } = hideShowSlice.actions;
export default hideShowSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    showHideSettingn: boolean;
    personalPage: boolean;
    login: {
        component: boolean;
        currentUser: any;
        error: boolean;
    };
    register: {
        error: boolean;
        Successful: boolean;
    };
}
const initialState: InitialState = {
    showHideSettingn: false,
    personalPage: false,
    login: {
        component: false,
        currentUser: null,
        error: false,
    },
    register: {
        error: false,
        Successful: false,
    },
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onsettingOpacity: (state) => {
            state.showHideSettingn = true;
        },
        offsettingOpacity: (state) => {
            state.showHideSettingn = false;
        },
        onPersonalPage: (state) => {
            state.personalPage = true;
        },
        offPersonalPage: (state) => {
            state.personalPage = false;
        },

        authSuccessful: (state) => {
            state.login.component = true;
        },
        userData: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        authFailed: (state) => {
            state.login.component = false;
            state.login.error = true;
        },

        registerSuccessful: (state) => {
            state.register.error = false;
            state.register.Successful = true;
        },
        registerFailed: (state) => {
            state.register.error = true;
            state.register.Successful = false;
        },
        logOutSuccess: (state) => {
            state.login.component = false;
            state.login.currentUser = null;
            state.login.error = false;
            state.showHideSettingn = false;
        },
    },
});
export const {
    onsettingOpacity,
    offsettingOpacity,
    userData,

    registerSuccessful,
    registerFailed,
    authSuccessful,
    authFailed,
    logOutSuccess,

    onPersonalPage,
    offPersonalPage,
} = authSlice.actions;
export default authSlice.reducer;

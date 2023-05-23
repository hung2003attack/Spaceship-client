import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateHideShow {
    setting: boolean;
    personalPage: boolean;
    idUser: string[];
    errorServer: {
        check: boolean;
        message?: string;
    };
}
const initialState: InitialStateHideShow = {
    setting: false,
    personalPage: false,
    idUser: [],
    errorServer: {
        check: false,
        message: '',
    },
};
const hideShowSlice = createSlice({
    name: 'hideShow',
    initialState,
    reducers: {
        onSetting: (state) => {
            state.setting = true;
        },
        offSetting: (state) => {
            state.setting = false;
        },
        onPersonalPage: (state) => {
            state.personalPage = true;
        },
        offPersonalPage: (state) => {
            state.personalPage = false;
        },
        offAll: (state) => {
            state.personalPage = false;
            state.setting = false;
        },
        setIdUser: (state, action) => {
            state.idUser = action.payload;
        },
        setTrueErrorServer: (state, action?: { payload: string }) => {
            state.errorServer.check = true;
            state.errorServer.message = action?.payload;
        },
        setFalseErrorServer: (state) => {
            state.errorServer.check = false;
            state.errorServer.message = '';
        },
    },
});
export const {
    onSetting,
    offSetting,
    onPersonalPage,
    offPersonalPage,
    setIdUser,
    offAll,
    setTrueErrorServer,
    setFalseErrorServer,
} = hideShowSlice.actions;
export default hideShowSlice.reducer;

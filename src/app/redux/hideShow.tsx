import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateHideShow {
    setting: boolean;
    personalPage: boolean;
    idUser: string[];
}
const initialState: InitialStateHideShow = {
    setting: false,
    personalPage: false,
    idUser: [],
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
    },
});
export const { onSetting, offSetting, onPersonalPage, offPersonalPage, setIdUser, offAll } = hideShowSlice.actions;
export default hideShowSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    login: string;
    register: string;
    sn: string;
    l: string;
    w: string;
}
const initialState: InitialState = {
    login: 'vi',
    register: 'vi',
    sn: 'vi',
    l: 'vi',
    w: 'vi',
};

const languageSlide = createSlice({
    name: 'language',
    initialState: initialState,
    reducers: {
        changeLogin: (state, action) => {
            state.login = action.payload;
        },
        changeRegister: (state, action) => {
            state.register = action.payload;
        },
        changeThree: (state, action: { payload: { sn: string; l: string; w: string } }) => {
            state.sn = action.payload.sn;
            state.l = action.payload.l;
            state.w = action.payload.w;
        },
        changeSN: (state, action) => {
            state.sn = action.payload;
        },
    },
});
export const { changeLogin, changeRegister, changeThree, changeSN } = languageSlide.actions;
export default languageSlide.reducer;

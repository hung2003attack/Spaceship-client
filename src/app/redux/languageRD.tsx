import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    login: string;
    register: string;
    sn: string;
    l: string;
    w: string;
}
const initialState: InitialState = {
    login: 'VN',
    register: 'VN',
    sn: 'VN',
    l: 'VN',
    w: 'VN',
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
    },
});
export const { changeLogin, changeRegister, changeThree } = languageSlide.actions;
export default languageSlide.reducer;

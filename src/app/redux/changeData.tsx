import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: '',
    background: '',
    fullName: '',
    nickName: '',
};
const changeDataUser = createSlice({
    name: 'dataUser',
    initialState,
    reducers: {
        changeAvatar(state, action) {
            state.avatar = action.payload;
        },
        changeBackground(state, action) {
            state.background = action.payload;
        },
    },
});
export const { changeAvatar, changeBackground } = changeDataUser.actions;
export default changeDataUser.reducer;

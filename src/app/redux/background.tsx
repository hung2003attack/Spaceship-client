import { createSlice } from '@reduxjs/toolkit';

interface Props {
    colorText: string;
    colorBg: string;
}
const initialState: Props = {
    colorText: '#cbcbcb',
    colorBg: '#202124',
};
const backgroundSilde = createSlice({
    name: 'background',
    initialState: initialState,
    reducers: {
        changeText: (state, action) => {
            state.colorText = action.payload;
        },
        changeBg: (state, action) => {
            state.colorBg = action.payload;
        },
    },
});
export const { changeBg, changeText } = backgroundSilde.actions;
export default backgroundSilde.reducer;

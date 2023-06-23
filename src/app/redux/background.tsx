import { createSlice } from '@reduxjs/toolkit';

export interface PropsBackGroundRedux {
    colorText: string;
    colorBg: number;
}
const initialState: PropsBackGroundRedux = {
    colorText: '#cbcbcb',
    colorBg: 1,
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

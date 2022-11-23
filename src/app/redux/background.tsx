import { createSlice } from '@reduxjs/toolkit';

interface Props {
    main: boolean;
}
const initialState: Props = {
    main: false,
};
const backgroundSilde = createSlice({
    name: 'background',
    initialState: initialState,
    reducers: {
        changeMain: (state, action) => {
            state.main = action.payload;
        },
    },
});
export const { changeMain } = backgroundSilde.actions;
export default backgroundSilde.reducer;

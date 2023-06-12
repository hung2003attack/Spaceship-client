import { createSlice } from '@reduxjs/toolkit';

export interface PropsReloadRD {
    people: number;
}
const initialState: PropsReloadRD = {
    people: 0,
};
const reloadPage = createSlice({
    name: 'reload',
    initialState: initialState,
    reducers: {
        people: (state, action) => {
            state.people = action.payload;
        },
    },
});
export const { people } = reloadPage.actions;
export default reloadPage.reducer;

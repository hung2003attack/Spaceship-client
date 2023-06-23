import { createSlice } from '@reduxjs/toolkit';

export interface PropsReloadRD {
    people: number;
    chat: { id: string; avatar: any; fullName: string; gender: number }[];
}
const initialState: PropsReloadRD = {
    people: 0,
    chat: [],
};
const reloadPage = createSlice({
    name: 'reload',
    initialState: initialState,
    reducers: {
        people: (state, action) => {
            state.people = action.payload;
        },
        onChat: (state, action) => {
            let here = false;
            state.chat.forEach((c) => {
                if (c.id === action.payload.id) {
                    here = true;
                }
            });
            if (!here) {
                if (state.chat) {
                    state.chat?.push(action.payload);
                } else {
                    state.chat = [action.payload];
                }
            }
        },
        offChat: (state, action) => {
            const newData = state.chat.filter((chat) => chat.id !== action.payload);
            state.chat = newData;
        },
    },
});
export const { people, onChat, offChat } = reloadPage.actions;
export default reloadPage.reducer;

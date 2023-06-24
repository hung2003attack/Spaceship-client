import { createSlice } from '@reduxjs/toolkit';

export interface PropsReloadRD {
    people: number;
    chat: { id_room: string; user: { id: string; avatar: any; fullName: string; gender: number } }[];
    userOnline: string[];
}
const initialState: PropsReloadRD = {
    people: 0,
    chat: [],
    userOnline: [],
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
                if (c.id_room === action.payload.id) {
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
            const newData = state.chat.filter((chat) => chat.id_room !== action.payload);
            state.chat = newData;
        },
        online: (state, action) => {
            state.userOnline = action.payload;
        },
    },
});
export const { people, onChat, offChat, online } = reloadPage.actions;
export default reloadPage.reducer;

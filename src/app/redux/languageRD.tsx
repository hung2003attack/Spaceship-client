import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    login: string;
    register: string;
}
const initialState: InitialState = {
    login: 'VN',
    register: 'VN'
}

const languageSlide = createSlice({
    name: 'language',
    initialState: initialState,
    reducers: {
        changeLogin: (state, action) => {
            state.login = action.payload
        },
        changeRegister: (state, action) => {
            state.register = action.payload

        }
    }
})
export const {
    changeLogin,
    changeRegister
} = languageSlide.actions
export default languageSlide.reducer
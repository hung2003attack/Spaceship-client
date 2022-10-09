import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    login: string;
}
const initialState: InitialState = {
    login: 'VN'
}

const languageSlide = createSlice({
    name: 'language',
    initialState: initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.login = action.payload
        }
    }
})
export const {
    changeLanguage
} = languageSlide.actions
export default languageSlide.reducer
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'light'
    },
    reducers: {
        toggleTheme: (state, action) => {
            state.value = action.payload ? 'light' : '';
        } 
    }
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = state => state.theme.value;

export default themeSlice.reducer;
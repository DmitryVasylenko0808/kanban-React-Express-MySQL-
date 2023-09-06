import { createSlice } from "@reduxjs/toolkit";

const formsSlice = createSlice({
    name: 'forms',
    initialState: {
        forms: {
            taskForm: false,
            boardForm: false,
            taskView: false
        },
        variant: ''
    },
    reducers: {
        openForm: (state, action) => {
            const { form, variant } = action.payload;
            for (let key of Object.keys(state.forms)) {
                if (key === form) {
                    state.forms[key] = true;
                } else {
                    state.forms[key] = false;
                }
            }
            state.variant = variant;
        },
        closeForm: (state, action) => {
            for (let key of Object.keys(state.forms)) {
                if (key === action.payload) {
                    state.forms[key] = false;
                }
            }
            state.variant = '';
        }
    }
});

export const { openForm, closeForm } = formsSlice.actions;

export const selectForms = state => state.forms.forms;
export const selectVariant = state => state.forms.variant;

export default formsSlice.reducer;
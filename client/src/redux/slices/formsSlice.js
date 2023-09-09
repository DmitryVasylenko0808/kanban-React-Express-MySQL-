import { createSlice } from "@reduxjs/toolkit";

const formsSlice = createSlice({
    name: 'forms',
    initialState: {
        forms: {
            taskForm: false,
            boardForm: false,
            taskView: false
        },
        variant: '',
        boardId: null,
        taskId: null
    },
    reducers: {
        openForm: (state, action) => {
            const { form, variant, boardId, taskId } = action.payload;
            for (let key of Object.keys(state.forms)) {
                if (key === form) {
                    state.forms[key] = true;
                    state.boardId = variant === 'add' ? boardId : null;
                    state.taskId = variant === 'add' ? taskId : null;
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
            state.boardId = null;
            state.taskId = null;
        }
    }
});

export const { openForm, closeForm } = formsSlice.actions;

export const selectForms = state => state.forms.forms;
export const selectVariant = state => state.forms.variant;
export const selectBoardId = state => state.forms.boardId;
export const selectTaskId = state => state.forms.taskId;

export default formsSlice.reducer;
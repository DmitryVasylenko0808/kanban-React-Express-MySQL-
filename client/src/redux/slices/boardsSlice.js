import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchBoards = createAsyncThunk(
    "boards/fetchBoards",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/boards/');
            const { boards } = res.data;
            return boards;
        } catch (err) {
            const { message } = err.response.data;
            return rejectWithValue(message);
        }
    }
);

export const fetchColumns = createAsyncThunk(
    "boards/fetchColumns",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/boards/${id}`);
            let { data } = res.data;
            data = data.map(item => ({ boardId: id, ...item }));
            console.log(data);
            return data;
        } catch (err) {
            const { message } = err.response.data;
            return rejectWithValue(message);
        }
    }
);

export const createBoard = createAsyncThunk(
    "boards/createBoard",
    async (boardData, { rejectWithValue }) => {
        try {
            const res = await axios.post('/boards/create', boardData);
            const { data } = res.data;
            console.log(data);
            return data;
        } catch (err) {
            const { error } = err.response.data;
            return rejectWithValue(error);
        }
    }
);

export const deleteBoard = createAsyncThunk(
    "boards/deleteBoard",
    async boardId => {
        try {
            await axios.delete(`/boards/${boardId}`);
            return boardId;
        } catch (err) {
            const { message } = err.response.data;
            return rejectWithValue(message);
        }
    }
);

export const createTask = createAsyncThunk(
    "boards/createTask",
    async (taskData, { rejectWithValue }) => {
        try {
            const res = await axios.post('/tasks/create', taskData);
            const { taskId } = res.data;
            console.log({...taskData, taskId});
            return {...taskData, taskId};
        } catch (err) {
            const { error } = err.response.data;
            return rejectWithValue(error);
        }
    }
);

export const toggleSubtask = createAsyncThunk(
    "boards/toggleSubtask",
    async data => {
        try {
            const res = await axios.patch(`/tasks/toggle_subtask/${data.subtaskId}`, data);
            const { subtask } = res.data;
            return { 
                id: subtask.id,
                status: subtask.status, 
                columnId: data.columnId, 
                task_id: subtask.task_id 
            };
        } catch (err) {
            return null;
        }
    }
);

export const changeColumn = createAsyncThunk(
    "boards/changeColumn",
    async data => {
        try {
            const res = await axios.patch(`/tasks/change_column/${data.id}`, data);
            console.log(res.data);
            const { task } = res.data;
            return {...task, prevColumnId: data.prevColumnId};
        } catch (err) {
            return null;
        }
    }
);

export const deleteTask = createAsyncThunk(
    "boards/deleteTask",
    async data => {
        try {
            await axios.delete(`/tasks/${data.taskId}`);
            return { 
                columnId: data.columnId, 
                taskId: data.taskId 
            };
        } catch (err) {
            return null;
        }
    }
);

export const editTask = createAsyncThunk(
    "boards/editTask",
    async (taskData, { rejectWithValue }) => {
        try {
            console.log(taskData);
            const res = await axios.put(`/tasks/edit/${taskData.id}`, taskData);
            return {...taskData, prevColumnId: taskData.prevColumnId};
        } catch (err) {
            const { error } = err.response.data;
            return rejectWithValue(error);
        }
    }
)

const boardsSlice = createSlice({
    name: "boards",
    initialState: {
        items: [],
        columns: [],
        status: 'idle',
        statusColumns: 'idle',
        error: null,
        errorColumns: null
    },
    reducers: {
        clearAll: state => {
            state.items = [];
            state.columns = [];
            state.status = 'idle';
            state.statusColumns = 'idle';
            state.error = null;
            state.errorColumns = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBoards.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.items = [];
            })

            .addCase(fetchColumns.pending, state => {
                state.statusColumns = 'loading';
            })
            .addCase(fetchColumns.fulfilled, (state, action) => {
                state.statusColumns = 'succeeded';
                state.columns = action.payload;
            })
            .addCase(fetchColumns.rejected, (state, action) => {
                state.statusColumns = 'failed';
                state.errorColumns = action.payload;
                state.columns = [];
            })

            .addCase(createBoard.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteBoard.rejected, (state, action) => {
                null;
            })

            .addCase(createTask.fulfilled, (state, action) => {
                const column = state.columns.find(col => col.column_id === action.payload.columnId);
                console.log(action.payload);
                console.log(column);
                const task = {
                    id: action.payload.taskId,
                    column_id: column.column_id,
                    column_title: column.column_title,
                    task_title: action.payload.title,
                    subtasks: action.payload.subtasks.length,
                    subtasks_completed: 0
                };
                column.tasks.push(task);
                state.error = null;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deleteTask.fulfilled, (state, action) => {
                const column = state.columns.find(col => col.column_id === action.payload.columnId);
                column.tasks = column.tasks.filter(t => t.id !== action.payload.taskId);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                null;
            })

            .addCase(editTask.fulfilled, (state, action) => {
                let column = state.columns.find(col => col.column_id === action.payload.prevColumnId);
                let task = column.tasks.find(t => t.id === action.payload.id);

                const subtasksCount = action.payload.subtasks.length;
                const completedSubtasksCount = action.payload.subtasks.filter(s => s.status).length;
                task = { 
                    ...task,
                    column_id: action.payload.columnId,
                    column_title: column.column_title,
                    task_title: action.payload.title,
                    subtasks: subtasksCount,
                    subtasks_completed: completedSubtasksCount
                };

                if (action.payload.prevColumnId !== task.column_id) {
                    column.tasks = column.tasks.filter(t => t.id !== task.id);
                    let nextColumn = state.columns.find(col => col.column_id === task.column_id);
                    nextColumn.tasks.push(task);
                } else {
                    column.tasks = column.tasks.map(t => {
                        if (t.id === task.id) {
                            console.log({ ...t });
                            return task;
                        } else {
                            console.log(t);
                            return t;
                        }
                    });
                }
                
                state.error = null;
            })
            .addCase(editTask.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(toggleSubtask.fulfilled, (state, action) => {
                const column = state.columns.find(col => col.column_id === action.payload.columnId);
                const task = column.tasks.find(t => t.id === action.payload.task_id);
                if (action.payload.status) {
                    task.subtasks_completed = parseFloat(task.subtasks_completed) + 1;
                } else {
                    task.subtasks_completed = parseFloat(task.subtasks_completed) - 1;
                }
                
            })
            .addCase(toggleSubtask.rejected, (state, action) => {
                null;
            })

            .addCase(changeColumn.fulfilled, (state, action) => {
                let column = state.columns.find(col => col.column_id === action.payload.prevColumnId);
                let task = column.tasks.find(t => t.id === action.payload.id);

                column.tasks = column.tasks.filter(t => t.id !== task.id);
                let newColumn = state.columns.find(col => col.column_id === action.payload.column_id);
                newColumn.tasks.push(task);
                console.log(newColumn.column_id);
            })
    }
});

export const { clearAll } = boardsSlice.actions;
export const selectColumns = state => state.boards.columns;

export default boardsSlice.reducer;
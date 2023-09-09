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
            const { data } = res.data;
            return data;
        } catch (err) {
            const { message } = err.response.data;
            return rejectWithValue(message);
        }
    }
);

export const createBoard = createAsyncThunk(
    "boards/createBoard",
    async boardData => {
        try {
            const res = await axios.post('/boards/create', boardData);
            const { data } = res.data;
            return data;
        } catch (err) {
            return null;
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
            })
            .addCase(createBoard.rejected, (state, action) => {
                null
            })

            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteBoard.rejected, (state, action) => {
                null;
            })
    }
});

export default boardsSlice.reducer;
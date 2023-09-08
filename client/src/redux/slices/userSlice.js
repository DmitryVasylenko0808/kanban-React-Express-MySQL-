import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/users/me');
            return res.data;
        } catch (err) {
            const { message } = err.response.data;
            return rejectWithValue(message);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logoutUser: state => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
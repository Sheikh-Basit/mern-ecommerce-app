import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDetail = createAsyncThunk(
    "profile/fetchDetail",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/auth/getUser', {
                headers: {
                    authToken: token,
                }
            });

            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch profile");
        }
    }
)

const userDetailSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userDetailSlice.reducer;
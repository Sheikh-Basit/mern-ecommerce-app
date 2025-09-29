import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showAlert } from './AlertSlice';

export const registerUser = createAsyncThunk(
    'auth/signup',
    async ({ username, email, password }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                username, email, password
            })

            if (response.data.message) {
                dispatch(showAlert({ message: "Success! User registered successfully", type: "success" }));
            }
            if (response.data.error) {
                dispatch(showAlert({ message: `Error! ${response.data.error}`, type: "error" }));
            }


        } catch (error) {
            dispatch(showAlert({ message: `Error! ${response.data.error}`, type: "error" }));
            return rejectWithValue(error.response.data.error || "Login failed");
        }

    }
)

const signUpSlice = createSlice({
    name: 'signUp',
    initialState: {
        loading: false,
        message: "",
        error: null,
    },

    reducer: {},

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
                state.error = null;

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default signUpSlice.reducer;
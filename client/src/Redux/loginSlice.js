// src/redux/slices/loginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlert } from "./AlertSlice";
import {jwtDecode} from 'jwt-decode';

// Async thunk for login
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });

            const token = response.data.token;
            
            if (token) {
                const userData = jwtDecode(token);
                localStorage.setItem("token", token);
                dispatch(showAlert({ message: "Login successful!", type: "success" }));
                return { token, role: userData.role };
            } else {
                return rejectWithValue("Token not found in response");
            }
        } catch (error) {
            dispatch(showAlert({ message: "Error! Please enter correct login credentials", type: "error" }));
            return rejectWithValue(error.response.data.message || "Login failed");
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        token: localStorage.getItem("token") || null,
        role:null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.success = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.success = true;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

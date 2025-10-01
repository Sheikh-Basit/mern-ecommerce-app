import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlert } from "./AlertSlice";

export const sendEmail = createAsyncThunk(
    'auth/sendEmail',
    async ({ email }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/forgotPassword', {
                email
            });

            const ResetToken = response.data.resetToken;

            dispatch(showAlert({ message: "Email send successfully", type: "success" }));
            return ResetToken;

        } catch (error) {
            dispatch(
                showAlert({
                    message: "Error! Please enter correct email address",
                    type: "error",
                })
            );
            return rejectWithValue(error.response?.data?.message || "Wrong Email Address");
        }
    }
)

const ForgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        resetToken: null,
        error: null,
        success: false
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.pending, (state) => {
                state.loading = true;
                state.error = null,
                    state.success = false;
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.resetToken = action.payload;
                state.error = null;
                state.success = false;
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.loading = false;
                state.resetToken = null;
                state.error = action.payload;
                state.success = false;
            })
    }

})

export default ForgotPasswordSlice.reducer;
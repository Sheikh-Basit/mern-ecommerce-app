import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showAlert } from './AlertSlice';

// ===================== REGISTER USER =====================
export const registerUser = createAsyncThunk(
  'auth/signup',
  async ({ username, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // ✅ Success or error message handling
      if (response.data?.message) {
        dispatch(showAlert({ message: response.data.message, type: 'success' }));
      }

      if (response.data?.error) {
        dispatch(showAlert({ message: `Error! ${response.data.error}`, type: 'error' }));
        return rejectWithValue(response.data.error);
      }

      // ✅ Return response data for reducer
      return response.data;

    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Something went wrong";
      dispatch(showAlert({ message: `Error! ${errorMessage}`, type: 'error' }));
      return rejectWithValue(errorMessage);
    }
  }
);

// ===================== SLICE =====================
const signUpSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "User registered successfully";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default signUpSlice.reducer;

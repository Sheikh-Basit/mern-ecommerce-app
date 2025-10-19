import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showAlert } from './AlertSlice';

// Fetch all users
export const fetchUsers = createAsyncThunk('/auth/fetchUsers', async () => {
  const res = await axios.get('http://localhost:3000/auth/admin/users', {
    headers: {
      authToken: localStorage.getItem('token')
    }
  });
  return res.data;
});

//Update user
export const updateUser = createAsyncThunk('/auth/updateUser',
  async (formData , { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put('http://localhost:3000/auth/updateUser', formData, {
        headers: {
          authToken: localStorage.getItem('token')
        }
      });
      // Success or error message handling
      if (response.data?.message) {
        dispatch(showAlert({ message: response.data.message, type: 'success' }));
      }

      if (response.data?.error) {
        dispatch(showAlert({ message: `Error! ${response.data.error}`, type: 'error' }));
        return rejectWithValue(response.data.error);
      }
      return res.data;

    } catch (error) {
      dispatch(showAlert({ message: `Error! ${error.message}`, type: "error", }));
      return rejectWithValue(error.response?.data?.message || "User Not Updated");
    }
  });

//Delete user
export const deleteUser = createAsyncThunk('/auth/deleteUser',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`http://localhost:3000/auth/admin/deleteUser/${id}`, {
        headers: {
          authToken: localStorage.getItem('token')
        }
      });
      dispatch(showAlert({ message: "User Deleted Successfully", type: "success" }));
      return id;
    } catch (error) {
      dispatch(showAlert({ message: `Error! ${error.message}`, type: "error", }));
      return rejectWithValue(error.response?.data?.message || "User Not deleted");
    }
  });

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],          // it hold all users
    loading: false,
    error: null,
    updateStatus: {
      loading: false,
      error: null,
      success: false
    },
    deleteStatus: {
      loading: false,
      error: null,
      success: false
    }
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = { loading: false, error: null, success: false };
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = { loading: false, error: null, success: false };
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases for Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Cases for Updata User
      .addCase(updateUser.pending, (state) => {
        state.updateStatus.loading = true;
        state.updateStatus.error = null;
        state.updateStatus.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = { loading: false, error: null, success: true };
        const index = state.data.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.error = action.error.message;
        state.updateStatus.success = false;
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = { loading: true, error: null, success: false };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteStatus = { loading: false, error: null, success: true };
        state.data = state.data.filter(u => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = { loading: false, error: action.error.message, success: false };
      });
  }
});

export const { resetUpdateStatus, resetDeleteStatus } = usersSlice.actions;
export default usersSlice.reducer;

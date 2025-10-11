import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Thunk to fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const res = await axios.get('http://localhost:3000/orders/getAllOrders',{
    headers: {
        authToken: localStorage.getItem('token')
    }
  });
  return res.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default ordersSlice.reducer;

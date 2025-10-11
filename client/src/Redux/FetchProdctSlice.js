import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Thunk to fetch orders
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const res = await axios.get('http://localhost:3000/products/',{
    headers: {
        authToken: localStorage.getItem('token')
    }
  });
  
  return res.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showAlert } from './AlertSlice';

// fetch all orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const res = await axios.get('http://localhost:3000/orders/getAllOrders', {
    headers: {
      authToken: localStorage.getItem('token')
    }
  });
  return res.data;
});

// Update Order Status
export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`http://localhost:3000/orders/updateOrderStatus/${orderId}`,
        { status },
        {
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
      return response.data.order;

    } catch (error) {
      dispatch(showAlert({ message: `Error! ${response.data.error}`, type: 'error' }));
      return rejectWithValue(response.data.error);
    }
  });

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // Fetch Orders
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
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading= false;
        const updatedOrder = action.payload;

        // Update order without refresh
        state.data = state.data.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default ordersSlice.reducer;

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showAlert } from './AlertSlice';

// ===================== ADD NEW PRODUCT =====================
export const addProduct = createAsyncThunk("product/AddProduct",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post('http://localhost:3000/products/addProduct',
                formData,
                {
                    headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        'authToken': localStorage.getItem('token')
                    }
                }
            );

            console.log(response)

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


// ===================== Add Product Slice ====================
const addProductSlice = createSlice({
    name: "addProduct",
    initialState: {
        loading: false,
        message: "",
        error: null,
      },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message || "Product added successfully";
            state.error = null;
          })
          .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
});

export default addProductSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alert",
    initialState:{
        message: null,
        type: null,
    },

    reducers:{
        showAlert: (state, action) =>{
            state.message = action.payload.message;
            state.type = action.payload.type;
        },

        clearAlert: (state) => {
            state.message = null;
            state.type =  null;
        }

    }
})

export const {showAlert, clearAlert} = alertSlice.actions;
export default alertSlice.reducer;
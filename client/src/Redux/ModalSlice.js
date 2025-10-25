import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name: 'Modal',
    initialState:{
        Open: false,
        type: null,
        data: null,
    },
    reducers:{
        openModal: (state, action)=>{
            state.Open =true;
            state.type = action.payload.type;
            state.data = action.payload.data;
        },
        closeModal: (state)=>{
            state.Open =false;
            state.type = null;
            state.data = null;
        },
    }
});

export const {openModal, closeModal} = ModalSlice.actions;
export default ModalSlice.reducer;
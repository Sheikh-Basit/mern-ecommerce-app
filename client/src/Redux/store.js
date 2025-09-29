import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import signUpSlice from './signUpSlice'
import alertSlice from './AlertSlice';

const store = configureStore({
    reducer: {
        login: loginSlice,
        signup: signUpSlice,
        alert: alertSlice
    }
})

export default store;
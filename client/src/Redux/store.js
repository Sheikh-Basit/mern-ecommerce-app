import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import signUpSlice from './signUpSlice'
import alertSlice from './AlertSlice';
import ForgotPasswordSlice from './ForgotPassword';

const store = configureStore({
    reducer: {
        login: loginSlice,
        signup: signUpSlice,
        ForgotPassword: ForgotPasswordSlice,
        alert: alertSlice
    }
})

export default store;
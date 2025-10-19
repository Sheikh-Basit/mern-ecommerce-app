import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import signUpSlice from './signUpSlice'
import alertSlice from './AlertSlice';
import ForgotPasswordSlice from './ForgotPassword';
import userDetailSlice from './userDetailSlice';
import ordersSlice from './OrderSlice';
import productSlice from './FetchProdctSlice';
import addProductSlice from './AddProductSlice';

const store = configureStore({
    reducer: {
        login: loginSlice,
        signup: signUpSlice,
        ForgotPassword: ForgotPasswordSlice,
        alert: alertSlice,
        userDetail: userDetailSlice,
        order: ordersSlice,
        products: productSlice,
        addProduct: addProductSlice
    }
})

export default store;
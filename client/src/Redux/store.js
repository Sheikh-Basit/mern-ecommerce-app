import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import signUpSlice from './signUpSlice'
import alertSlice from './AlertSlice';
import ForgotPasswordSlice from './ForgotPassword';
import usersSlice from './usersSlice';
import userDetailSlice from './userDetailSlice';
import ordersSlice from './OrderSlice';
import productSlice from './FetchProdctSlice';
import addProductSlice from './AddProductSlice';
import ModalSlice from './ModalSlice';

const store = configureStore({
    reducer: {
        login: loginSlice,
        signup: signUpSlice,
        ForgotPassword: ForgotPasswordSlice,
        alert: alertSlice,
        users: usersSlice,
        userDetail: userDetailSlice,
        order: ordersSlice,
        products: productSlice,
        addProduct: addProductSlice,
        modal: ModalSlice
    }
})

export default store;
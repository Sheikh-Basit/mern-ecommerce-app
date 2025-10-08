import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { sendEmail} from '../Redux/ForgotPassword.js'
import Logo from '../Header/logo.jsx';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ForgotPassword);
 
    // Form Data
    const [formData, setFormData] = useState({ email: ""});

    // Handle Changing in the form input feilds
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendEmail(formData))
    }

    return (
        <div className='container p-8 mx-auto max-h-screen '>
            {/* Logo */}
            <Logo/>

            <div className="flex justify-center items-center max-w-md p-5 mt-16 mx-auto border border-gray-200">
                <form className="w-full" onSubmit={handleSubmit}>
                    <h4 className='text-4xl font-semibold'>Forgot Password</h4>
                    <p className='text-gray-500 mb-3'>Enter your registered email to reset your password</p>
                    {/* Email */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@abc.com" required />
                    </div>

                    {/* Login button */}
                    <button type="submit" disabled={loading} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 text-center">{loading ? 'Loading...' : 'Reset Password'}</button>

                </form>

            </div>

        </div>
    )
}

export default ForgotPassword

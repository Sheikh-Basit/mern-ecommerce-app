import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

// Eye icon
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser} from '../Redux/loginSlice'

const Login = () => {
    const dispatch = useDispatch();
    const { loading, token, role } = useSelector(state => state.login);
    const navigate = useNavigate();
    
    useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [token, role, navigate]);

    // Show and hide password
    const [showPassword, setShowPassword] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({ email: "", password: "" });

    // Handle Changing in the form input feilds
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData))
    }

    
    return (
        <div className='container p-8 mx-auto max-h-screen '>
            {/* Logo */}
            <div className="">
                <img src="image.png" alt="logo" className='h-full w-full object-contain'/>
            </div>

            <div className="flex justify-center items-center max-w-md p-5 mt-16 mx-auto border border-gray-200">
                <form className="w-full" onSubmit={handleSubmit}>
                    <p className='text-gray-500'>Please enter your detail</p>
                    <h4 className='text-4xl font-semibold mb-3'>Welcome</h4>
                    {/* Email */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
                    </div>
                    {/* Password */}
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} id="password" name='password' value={formData.password} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />

                            {/* Eye Icons for show and hide the password */}
                            {showPassword ? <FaRegEyeSlash className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50" onClick={() => setShowPassword(false)} /> :
                                <FaRegEye className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50" onClick={() => setShowPassword(true)} />}

                        </div>
                    </div>

                    {/* Terms and Forgot password */}
                    <div className="flex justify-between mb-5">

                        {/* Terms and Condition */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                            </div>
                            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <Link to="/termandcondition" className="text-blue-600 hover:underline">terms and conditions</Link></label>
                        </div>
                        {/* Forgot Password */}
                        <Link to='/forgotPassword' className='text-blue-600 font-semibold text-sm'>Forgot Password</Link>
                    </div>

                    {/* Login button */}
                    <button type="submit" disabled={loading} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 text-center">{loading ? 'Logging in...' : 'Login'}</button>

                    {/* Don't have and account */}
                    <span>Don't have an account? <Link to='/signup' className='text-blue-600'>Signup</Link></span>
                </form>

            </div>

        </div>
    )
}

export default Login

import React, { useState } from 'react'

// Eye icon
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/signUpSlice'
import { Link } from 'react-router-dom';
import { showAlert } from '../Redux/AlertSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.signup);

  // Show and hide the password
  const [showPassword, setShowPassword] = useState(false);

  // Handle Form Data
  const [formData, setFormData] = useState({ username: "", email: "", password: "", Cpassword: "" });

  // Handle Changing in the form input feilds
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password and Confirm Password are matched?
    if (formData.password !== formData.Cpassword) {
      return dispatch(showAlert({ message: "Error! Password and Confirm Password must be matched", type: "error" }));
    }
    dispatch(registerUser({ username: formData.username, email: formData.email, password: formData.password }))
  }
  return (
    <div className='container p-8 mx-auto max-h-screen '>
      {/* Logo */}
      <div className="">
        <img src="image.png" alt="logo" className='h-full w-full object-contain' />
      </div>

      <div className="flex justify-center items-center max-w-xl p-5 mt-8 mx-auto border border-gray-200">
        {/* Form */}
        <form className="w-full" onSubmit={handleSubmit}>
          <p className='text-gray-500'>Please enter your detail</p>
          <h4 className='text-4xl font-semibold mb-3'>Create Account</h4>
          {/* Username */}
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input type="text" id="username" name='username' value={formData.username} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
          </div>
          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
          </div>
          <div className="flex gap-5">

            {/* Password */}
            <div className="mb-5 w-full">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <div className='relative'>
                <input type={showPassword ? 'text' : 'password'} id="password" name='password' value={formData.password} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />

                {showPassword ? <FaRegEyeSlash className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50" onClick={() => setShowPassword(false)} /> :
                  <FaRegEye className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50" onClick={() => setShowPassword(true)} />}

              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-5 w-full">
              <label htmlFor="Cpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
              <div className='relative'>
                <input type={showPassword ? 'text' : 'password'} id="Cpassword" name='Cpassword' value={formData.Cpassword} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />

                {showPassword ? <FaRegEyeSlash className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50" onClick={() => setShowPassword(false)} /> :
                  <FaRegEye className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50" onClick={() => setShowPassword(true)} />}

              </div>
            </div>
          </div>

          {/* SignUp Button */}

          <button type="submit" disabled={loading} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 text-center">{loading ? 'Loading...' : 'Signup'}</button>
          <br />

          {/* Already hanve an account */}
          <span>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></span>
        </form>

      </div>

    </div>
  )
}

export default Signup

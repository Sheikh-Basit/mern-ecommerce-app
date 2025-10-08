import React, { useState, useRef, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash, FaUpload } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/signUpSlice";
import { Link } from "react-router-dom";
import { showAlert } from "../Redux/AlertSlice";
import Logo from "../Header/logo";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.signup);

  // file input ref + file state + preview url
  const selectFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // password visibility
  const [showPassword, setShowPassword] = useState(false);

  // form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  // click handler to open file dialog
  const handleSelectFile = () => {
    selectFile.current?.click();
  };

  // handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    // create preview url
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // cleanup object URL when file changes / component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit handler - build FormData to include image
  const handleSubmit = (e) => {
    e.preventDefault();

    // password match check
    if (formData.password !== formData.Cpassword) {
      return dispatch(
        showAlert({
          message: "Error! Password and Confirm Password must match",
          type: "error",
        })
      );
    }

    // build payload (FormData) to send image + fields
    const payload = new FormData();
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("password", formData.password);
    if (selectedFile) {
      payload.append("profileImage", selectedFile);
    }

    // dispatch the thunk (your registerUser should accept FormData)
    dispatch(registerUser(payload));
  };

  return (
    <div className="container p-8 mx-auto max-h-screen">
      <Logo />

      <div className="flex justify-center items-center max-w-xl p-5 mt-8 mx-auto border border-gray-200">
        <form className="w-full" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Please enter your detail</p>
              <h4 className="text-4xl font-semibold mb-3">Create Account</h4>
            </div>

            {/* Select image */}
            <div className="image relative">
              <input
                type="file"
                accept="image/*"
                name="selectFile"
                onChange={handleFileChange}
                hidden
                ref={selectFile}
              />

              {/* preview or placeholder */}
              <div className="rounded-full w-20 h-20 bg-gray-100 overflow-hidden flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl text-gray-600 uppercase">
                    {formData.username ? formData.username[0] : "U"}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSelectFile}
                className="absolute bottom-0 right-0 -translate-y-1/4 translate-x-1/4 bg-black text-white rounded-full p-1 text-sm cursor-pointer"
                aria-label="Upload profile image"
              >
                <FaUpload />
              </button>
            </div>
          </div>

          {/* Username */}
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@domain.com"
              required
            />
          </div>

          <div className="flex gap-5">
            {/* Password */}
            <div className="mb-5 w-full">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-5 w-full">
              <label htmlFor="Cpassword" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Cpassword"
                  name="Cpassword"
                  value={formData.Cpassword}
                  onChange={handleChange}
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* SignUp Button */}
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 text-center"
          >
            {loading ? "Loading..." : "Signup"}
          </button>
          <br />

          {/* Already have an account */}
          <span>
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

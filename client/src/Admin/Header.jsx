import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { fetchDetail } from '../Redux/userDetailSlice';
import { NavLink } from 'react-router-dom';
import { openModal } from '../Redux/ModalSlice';

// Import icons
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";

const Header = ({ ToggleButton }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetail);

  // Open / Close Dropdown
  const [isShow, setIsShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  // Handle to close the dropown when click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(fetchDetail())
  }, [dispatch]);

  if (!user) return null;

  return (
    <header className='py-4 shadow-sm z-40 bg-white'>
      <div className="container px-6 mx-auto flex items-center justify-between gap-5 h-full text-blue-500 relative">

        <button className='p-1 rounded md:hidden outline outline-blue-500 cursor-pointer' aria-label='Menu' onClick={ToggleButton}><GiHamburgerMenu className='w-6 h-6' /></button>
        <div className="flex flex-1 md:mr-32">
          <div className="relative w-full max-w-xl focus-within:text-blue-500">
            <FaSearch className='absolute top-1/2 left-2 -translate-y-1/2 text-sm' />
            <input className="block w-full text-sm form-input leading-5 border border-gray-200 rounded focus:outline-3 focus:outline-blue-500/20 focus:border-blue-400 pl-8 py-2 text-gray-700" type="text" placeholder="Search for projects" aria-label="Search" />
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>

          <div className='border border-gray-400 rounded-full w-10 h-10 bg-gray-100 overflow-hidden flex items-center justify-center cursor-pointer' onClick={() => setIsShow(!isShow)}>

            {user.image ? (
              <img
                src={`http://localhost:3000${user.image}`}
                alt="Profile"
                className="w-10 h-10 rounded-full border object-cover"
              />
            ) : (
              <span className="text-xl text-gray-600 uppercase">
                {user.username ? user.username[0] : "U"}
              </span>
            )}
          </div>

          {/* Dropdown */}
          {isShow && <div className="shadow-md absolute right-0 top-full mt-4 mr-6 py-3 bg-white ">
            {/* Profile */}
            <NavLink to={'/admin/profile'} className={({ isActive }) => `flex items-center gap-3 py-1 pl-3 pr-5 hover:text-gray-800 border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500 border-transparent'}`}><FaUser /> Profile</NavLink>

            {/* Setting */}
            <NavLink to={'/admin/setting'} className={({ isActive }) => `flex items-center gap-3 py-1 pl-3 pr-5 hover:text-gray-800 border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500 border-transparent'}`}><IoMdSettings /> Setting</NavLink>

            {/* Logout */}
            <button className='flex items-center gap-3 py-1 pl-3 pr-5 text-gray-500 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 cursor-pointer' onClick={() => dispatch(openModal({ type: "logout" }))}><CgLogOut /> Logout</button>

          </div>}
        </div>
      </div>
    </header>
  )
}

export default Header

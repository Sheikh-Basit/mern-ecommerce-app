import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { fetchDetail } from '../Redux/userDetailSlice';

const Header = ({ ToggleButton }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(fetchDetail())
  }, [dispatch]);

  if (!user) return null;

  return (
    <header className='py-4 shadow-sm z-40 bg-white'>
      <div className="container px-6 mx-auto flex items-center justify-between gap-5 h-full text-blue-500 ">

        <button className='p-1 rounded md:hidden focus:outline focus:outline-blue-500' aria-label='Menu' onClick={ToggleButton}>
          <GiHamburgerMenu className='w-6 h-6' />
        </button>
        <div className="flex flex-1 md:mr-32">
          <div className="relative w-full max-w-xl focus-within:text-blue-500">
            <FaSearch className='absolute top-1/2 left-2 -translate-y-1/2 text-sm' />
            <input className="block w-full text-sm form-input leading-5 border border-gray-200 rounded focus:outline-none focus:border-blue-400 pl-8 py-2 text-gray-700" type="text" placeholder="Search for projects" aria-label="Search" />
          </div>
        </div>


        <div className='border border-gray-400 rounded-full w-10 h-10 bg-gray-100 overflow-hidden flex items-center justify-center'>

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
      </div>
    </header>
  )
}

export default Header

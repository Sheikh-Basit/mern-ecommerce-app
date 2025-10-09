import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDetail } from '../Redux/userDetailSlice'

import { FaSearch } from "react-icons/fa";

const Header = () => {
  const { user } = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  
 useEffect(()=>{
    dispatch(fetchDetail())
  }, [dispatch]);

  if (!user) return null;

  return (
    <header className='flex items-center justify-between p-3 shadow'>
      <div className="relative w-full max-w-xl mr-6 focus-within:text-blue-500">
        
          <FaSearch className='absolute top-1/2 left-2 -translate-y-1/2 text-sm'/>
          
          <input className="block w-full text-sm form-input leading-5 border border-gray-200 rounded focus:outline-none focus:border-blue-400 pl-8 py-2 text-gray-700" type="text" placeholder="Search for projects" aria-label="Search"/></div>
      <div className='rounded-full w-10 h-10 bg-gray-100 overflow-hidden flex items-center justify-center'>

        {user.image ? (
          <img
            src={`http://localhost:3000${user.image}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
        ) : (
          <span className="text-xl text-gray-600 uppercase">
            {user.username ? user.username[0] : "U"}
          </span>
        )}
      </div>
    </header>
  )
}

export default Header

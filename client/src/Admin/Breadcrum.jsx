import React from 'react'

import {FaHome} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Breadcrum = ({title}) => {
  return (
    <>
    <h1 className="text-2xl font-semibold my-6">{title}</h1>
    <div className='flex items-center text-gray-800 gap-2 font-semibold'>
        <NavLink to='/admin' className="flex items-center gap-2 text-blue-500">
           <FaHome/> Dashboard
        </NavLink>
        &gt;
        <p>{title}</p>  
    </div>
    </>
  )
}

export default Breadcrum

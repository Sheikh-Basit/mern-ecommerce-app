import React from 'react'
import Logo from '../Header/logo'
import { NavLink } from 'react-router-dom'

// import react icons
import { FaHome, FaShoppingCart, FaUsers, FaUser, } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";

const SideHeader = () => {
  return (
    <aside className='w-56 bg-gray-50 border-r border-r-gray-200'>
      
      <div className="logo p-4">
      <Logo/>
      </div>

      <nav className="mt-3">
      <NavLink to={'/admin'} end className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`} ><FaHome /> Dashboard</NavLink>
      <NavLink to={'/admin/orders'} className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`}><FaShoppingCart /> Orders</NavLink>
      <NavLink to={'/admin/products'} className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`}><TbTruckDelivery /> Products</NavLink>
      <NavLink to={'/admin/products'} className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`}><FaUsers /> Users</NavLink>
      <NavLink to={'/admin/products'} className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`}><BsChatSquareText /> Chats</NavLink>
      <hr className='my-5 text-gray-500'/>
      <NavLink to={'/admin/products'} className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`}><FaUser /> Profile</NavLink>
      <NavLink to={'/admin/products'} className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`}><IoMdSettings /> Settings</NavLink>
      <NavLink to={'/admin/products'} className={`flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-3 hover:border-blue-500 ${({isActive}) => isActive ? "border-blue-500" : ""}`}><CgLogOut /> Logout</NavLink>

      </nav>

      
    </aside>
  )
}

export default SideHeader

import React, { useState } from 'react'
import Logo from '../Header/logo'
import { NavLink, useLocation } from 'react-router-dom'

// import react icons
import { FaHome, FaShoppingCart, FaUsers, FaUser, FaAngleUp, FaAngleDown} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../Redux/ModalSlice';


const SideHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch =useDispatch();

  return (
    <div className='py-2'>

      {/* Logo */}
      <div className="logo p-4">
        <Logo />
      </div>

      <nav className="mt-3">
        {/* Dashboard */}
        <NavLink to={'/admin'} aria-label='Go to Dashboard' end className={({ isActive }) => `flex items-center gap-4 px-6 py-3 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500'}`} ><FaHome /> Dashboard</NavLink>

        {/* Orders */}
        <NavLink to={'/admin/orders'} className={({ isActive }) => `active flex items-center gap-4 px-6 py-3 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500'}`}><FaShoppingCart /> Orders</NavLink>

        {/* Products with dropdown */}
        <div>
          <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-between w-full gap-4 px-6 py-3 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 ${location.pathname.startsWith("/admin/products") || location.pathname.startsWith("/admin/add-product") ? "border-l-4 border-blue-500" : "text-gray-600"}`}>
            <span className='flex items-center gap-4'><TbTruckDelivery /> Products </span>
            <span>{isOpen? <FaAngleUp/> : <FaAngleDown/>}</span>
            </button>

          {/* Dropdown for add and all products */}
          {isOpen && <div className='mx-6 px-3 inset-shadow-sm inset-shadow-gray-300 border-gray-200'>
            <NavLink to={'/admin/products'} className={({ isActive }) => `flex items-center gap-4 py-1 hover:text-gray-800 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>All Products</NavLink>
            <NavLink to={'/admin/add-product'} className={({ isActive }) => `flex items-center gap-4 py-1 hover:text-gray-800 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} >Add Product</NavLink>

          </div>
          }
        </div>

        {/* Users */}
        <NavLink to={'/admin/users'} className={({ isActive }) => `flex items-center gap-4 px-6 py-3 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500'}`}><FaUsers /> Users</NavLink>

        {/* Chats */}
        <NavLink to={'/admin/chats'} className={({ isActive }) => `flex items-center gap-4 px-6 py-3 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500'}`}><BsChatSquareText /> Chats</NavLink>

        <hr className='my-5 text-gray-500' />

        {/* Profile */}
        <NavLink to={'/admin/profile'} className={({ isActive }) => `flex items-center gap-4 px-6 py-3 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500'}`}><FaUser /> Profile</NavLink>

        {/* Setting */}
        <NavLink to={'/admin/setting'} className={({ isActive }) => `flex items-center gap-4 px-6 py-3 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 ${isActive ? 'border-l-4 border-blue-500 text-gray-800' : 'text-gray-500'}`}><IoMdSettings /> Setting</NavLink>

        {/* Logout */}
        <button className='flex items-center gap-4 px-6 py-3 text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-blue-500 cursor-pointer' onClick={()=>dispatch(openModal({type:"logout"}))}><CgLogOut /> Logout</button>

      </nav>



    </div>
  )
}

export default SideHeader

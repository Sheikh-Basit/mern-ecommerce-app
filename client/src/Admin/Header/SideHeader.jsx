import React from 'react'
// import {Link} from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
const SideHeader = () => {
  return (
    <div>
      <div className="logo">MERN E-Commerce</div>

      <nav>
        
        <IoHomeOutline /> Dashboard
        
      </nav>
    </div>
  )
}

export default SideHeader

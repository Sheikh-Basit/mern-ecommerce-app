import React from 'react'
import {Link} from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
const SideHeader = () => {
  return (
    <div>
      <div className="logo">MERN E-Commerce</div>

      <nav>
        <Link>
        <IoHomeOutline /> Dashboard
        </Link>
      </nav>
    </div>
  )
}

export default SideHeader

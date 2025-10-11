import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'

import { fetchDetail } from '../Redux/userDetailSlice'
import SideHeader from './SideHeader'
import Header from './Header'
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(fetchDetail())
  }, [dispatch]);

  return (
    <div className='flex h-screen bg-gray-50'>
      <SideHeader />
      <div className="w-full flex flex-col flex-1">
        <Header />

        <main className='px-3 h-full overflow-y-auto'>
          <Outlet />
        </main>


      </div>
    </div >
  )
}

export default AdminLayout

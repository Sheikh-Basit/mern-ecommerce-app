import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'

import { fetchDetail } from '../Redux/userDetailSlice'
import SideHeader from './SideHeader'
import Header from './Header'
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  const dispatch = useDispatch();
  const [isOpenHeader, setIsOpenHeader] = useState(false);

   useEffect(()=>{
    dispatch(fetchDetail())
  }, [dispatch]);

  return (
    <div className='flex h-screen bg-gray-50'>
      <aside className={`sideHeader bg-white min-w-56 fixed md:static transform transition-transform duration-300 z-30 flex-shrink-0 overflow-y-auto h-full mt-18 md:mt-0 ${isOpenHeader ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <SideHeader />
      </aside>
      <div className="flex flex-col flex-1 w-full">
        <Header ToggleButton={()=>setIsOpenHeader(!isOpenHeader)}/>

        <main className='px-3 h-full overflow-auto'>
          <Outlet />
        </main>


      </div>
    </div >
  )
}

export default AdminLayout

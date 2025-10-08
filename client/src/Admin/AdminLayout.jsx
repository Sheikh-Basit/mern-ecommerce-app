import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/loginSlice'
import { fetchDetail } from '../Redux/userDetailSlice'
import SideHeader from './SideHeader'
import Header from './Header'
import Dashboard from './Dashboard'
import { Outlet } from "react-router-dom";
import Orders from './Orders'

const AdminLayout = () => {
  const { token } = useSelector(state => state.login)
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(fetchDetail());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return null;

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

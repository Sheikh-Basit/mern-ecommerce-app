import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../Redux/loginSlice'
import { fetchDetail } from '../Redux/userDetailSlice'

const AdminDashboard = () => {
   const { token, } = useSelector(state => state.login)
     const dispatch = useDispatch();
   
     const { user, loading, error } = useSelector((state) => state.userDetail);
   
     useEffect(() => {
       dispatch(fetchDetail());
     }, [dispatch]);
   
     if (loading) return <p>Loading...</p>;
     if (error) return <p className="text-red-500">{error}</p>;
     if (!user) return null;
   
     return (
       <div>
         <h1 className="text-3xl font-bold mb-4">Welcome, {user.username} 👋</h1>
   
         <div className="flex items-center gap-4">
           <div className='rounded-full w-20 h-20 bg-gray-100 overflow-hidden flex items-center justify-center'>
   
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
           <div>
             <p><strong>Email:</strong> {user.email}</p>
             <p><strong>Role:</strong> {user.role}</p>
           </div>
         </div>
   
         {token && (
           <div className="mt-4">
             <h4 className="text-lg">You are logged in ✅</h4>
             <button
               onClick={() => dispatch(logout())}
               className="mt-2 text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
             >
               Logout
             </button>
           </div>
         )}
       </div>
     )
}

export default AdminDashboard

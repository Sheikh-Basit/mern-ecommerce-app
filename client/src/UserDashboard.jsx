import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './Redux/loginSlice'

const UserDashboard = () => {
  const { token,} = useSelector(state => state.login)
  const dispatch = useDispatch();

  return (
    <div>
      <h1>This is User Dashboard</h1>

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

export default UserDashboard
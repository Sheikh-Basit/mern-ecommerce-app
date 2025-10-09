import React from 'react'
import { logout } from '../Redux/loginSlice.js'
import { useDispatch, useSelector } from 'react-redux';


const Logout = () => {
    const {token} = useSelector(state => state.login);
    const dispatch = useDispatch();
    return (
        token && (
            <div className="mt-4">
                <h4 className="text-lg">You are logged in ✅</h4>
                <button
                    onClick={() => dispatch(logout())}
                    className="mt-2 text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>
        )

    )
}

export default Logout

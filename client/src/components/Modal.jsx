import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../Redux/ModalSlice';
import { logout } from '../Redux/loginSlice';
import { IoWarningOutline } from "react-icons/io5";
import { deleteUser } from '../Redux/usersSlice';

const Modal = () => {
    const dispatch = useDispatch();
    const { Open, type, data } = useSelector(state => state.modal)
    const { data: users = [] } = useSelector((state) => state.users);

    // handle Delete User
    const handleDelete = () => {
        const id = data.id;
        dispatch(deleteUser({ id }));
        dispatch(closeModal());
    };

    if (type === "userDetail") {
        var userDetail = users.filter(user => user._id === data.id);
    }

    const redenContent = () => {
        switch (type) {
            case "logout":
                return (
                    <div className="flex flex-col items-center shadow px-6 py-4 text-center bg-blue-50 rounded-sm">

                        <IoIosLogOut className='text-9xl text-blue-700' />
                        <p className="text-lg">Oh no! You're leaving...</p>
                        <p>Are you sure?</p>
                        
                        <button onClick={() => dispatch(closeModal())} className="rounded-xl w-full mt-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2" >Naah, Just Kidding</button>
                        <button onClick={() => dispatch(logout())} className="rounded-xl w-full mt-2 text-blue-600 font-semibold border border-blue-600 px-4 py-2" >Yes, Log Me Out</button>
                    </div>
                )

            case "deleteUser":
                return (
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 p-5 bg-white rounded-md">
                        <div className="flex gap-3">
                            {/* Icon */}
                            <div className="flex items-center justify-center p-2 rounded-full h-fit bg-red-200">
                                <IoWarningOutline className="text-red-600 text-2xl" />
                            </div>
                            <div>
                                <h4 className="mb-2 text-xl font-semibold">Delete User</h4>
                                <p>Are you sure you want to delete this user? All of data will be permanently removed. This action cannot be undone.</p>
                                <div className="flex justify-end gap-2 mt-5">
                                    <button className="rounded-sm px-3 py-1 bg-gray-200 text-gray-600 cursor-pointer" onClick={() => dispatch(closeModal())}>Cancel</button>
                                    <button className="rounded-sm px-3 py-1 bg-red-200 text-red-600 cursor-pointer" onClick={() => handleDelete()}>Delete</button>
                                </div>
                            </div>

                        </div>
                    </div>
                )

            case "userDetail":
                return (

                    <div className="bg-white rounded-md p-3">
                        <h2 className='text-xl font-semibold'>{userDetail[0].username}</h2>
                        <hr className='text-gray-200 my-2' />
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            {/* profile image */}
                            <div className="userProfile flex justify-center">
                                <img src={`http://localhost:3000${userDetail[0].image}`} alt="" className='w-32 h-32 rounded-full object-cover' />
                            </div>

                            {/* User Detail */}
                            <div className="border p-3">
                                <div className="flex gap-4">
                                    <span>
                                        <span className='text-sm font-semibold'>Email</span>
                                        <p className='inset-shadow-sm inset-shadow-gray-300 px-2'>{userDetail[0].email}</p>
                                    </span>
                                    <span>
                                        <span className='text-sm font-semibold'>Email</span>
                                        <p className='inset-shadow-sm inset-shadow-gray-300 px-2'>{userDetail[0].email}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                )
        }
    }


    return (
        Open && <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-10" onClick={() => dispatch(closeModal())}></div>

            {/* Modal*/}
            {redenContent()}

        </div>
    )
}

export default Modal

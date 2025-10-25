import React, { useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../Redux/ModalSlice';
import { logout } from '../Redux/loginSlice';
import { IoWarningOutline } from "react-icons/io5";
import { deleteUser } from '../Redux/usersSlice';

const Modal = () => {
    const dispatch = useDispatch();
    const { Open, type, data } = useSelector(state => state.modal)

     // handle Delete User
    const handleDelete = () => {
        const id = data.id;
        dispatch(deleteUser({id}));
        dispatch(closeModal());
    };

    const redenContent = () => {
        switch (type) {
            case "logout":
                return (
                    <div className="flex items-center justify-center pt-20">
                        <div className="flex flex-col items-center shadow px-6 py-4 text-center bg-blue-50 rounded-sm">

                            <IoIosLogOut className='text-9xl text-blue-700' />
                            <p className="text-lg">Oh no! You're leaving...</p>
                            <p>Are you sure?</p>


                            <button onClick={() => dispatch(closeModal())} className="rounded-xl w-full mt-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2" >Naah, Just Kidding</button>
                            <button onClick={() => dispatch(logout())} className="rounded-xl w-full mt-2 text-blue-600 font-semibold border border-blue-600 px-4 py-2" >Yes, Log Me Out</button>
                        </div>

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
        }
    }


    return (
        Open && <div className="fixed top-0 left-0 w-full h-full z-50">
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-10" onClick={() => dispatch(closeModal())}></div>

            {/* Modal*/}
            {redenContent()}

        </div>
    )
}

export default Modal

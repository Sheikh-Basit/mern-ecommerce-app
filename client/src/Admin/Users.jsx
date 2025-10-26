import React, { useEffect, useState } from "react";
import Breadcrum from "./Breadcrum";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers } from "../Redux/usersSlice";
import Spinner from "../components/Spinner"

// Edit and Delete Icons
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { openModal } from "../Redux/ModalSlice";

const Users = () => {
    const dispatch = useDispatch();
    const { data: users = [], loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "_id", headerName: "User ID", flex: 1 },
        {
            field: "username", headerName: "User Name", flex: 1.5,
            renderCell: (params) => (
                <div className="flex items-center gap-3">
                    <div className='rounded-full w-10 h-10 border border-gray-400 bg-gray-100 overflow-hidden flex items-center justify-center'>

                        {params.row.image ? (
                            <img
                                src={`http://localhost:3000${params.row.image}`}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-xl text-gray-600 uppercase">
                                {params.row.username ? params.row.username[0] : "U"}
                            </span>
                        )}
                    </div>
                    <span>{params.row.username}</span>
                </div>
            ),
        },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "date", headerName: "Joined on", flex: 1 },
        {
            field: "action", headerName: "Actions", flex: 0.8,
            renderCell: (params) => {
                return (
                    <div className="flex items-center justify-center h-full gap-2 px-2">
                        <button onClick={() => dispatch(openModal({type: "userDetail", data: {id: params.row._id}}))} className="cursor-pointer rounded-sm border border-blue-600 text-blue-600 p-1 hover:bg-blue-600 hover:text-white" title="Edit" ><FaEye className="text-xl" /></button>

                        <button onClick={() => dispatch(openModal({type: "deleteUser", data: {id: params.row._id}}))} className="cursor-pointer rounded-sm border border-red-600 text-red-600 p-1 hover:bg-red-600 hover:text-white" title="Delete" ><MdDelete className="text-xl" /></button>


                    </div>
                )
            }
        },
    ];

    // Show all users Data
    const rows = users.filter(user => user.role === 'user').map((user, index) => ({
        id: index + 1,
        _id: user._id,
        username: user.username || "N/A",
        image: user.image,
        email: user.email || "N/A",

        date: new Date(user.createdAt).toLocaleDateString(),
    }));

    



    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container px-6 mx-auto">
            <Breadcrum title="Users" />
            {rows.length > 0 ?
                <div className="min-w-md my-6">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        disableSelectionOnClick

                    />
                </div> :
                <p className="mt-5">User not Found!</p>
            }

            
        </div>
    );
};

export default Users;

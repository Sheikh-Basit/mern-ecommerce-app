import React, { useEffect, useState } from "react";
import Breadcrum from "./Breadcrum";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { deleteUser, fetchUsers } from "../Redux/usersSlice";

// Edit and Delete Icons
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

const Users = () => {
    const dispatch = useDispatch();
    const { data: users = [], loading, error } = useSelector((state) => state.users);

    // handle show/hide Delete Modal
    const [isOpenModal, setIsOpenModal] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // handle Delete User
    const handleDelete = (id) => {
        setIsOpenModal(null);
        dispatch(deleteUser({ id }));
    };


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
                const id = params.row._id;
                return (
                    <div className="flex items-center justify-center h-full gap-2 px-2">
                        <button className="cursor-pointer rounded-sm border border-blue-600 text-blue-600 p-1 hover:bg-blue-600 hover:text-white" title="Edit" >
                            <FaEye className="text-xl" />

                        </button>

                        <button onClick={() => setIsOpenModal(id)} className="cursor-pointer rounded-sm border border-red-600 text-red-600 p-1 hover:bg-red-600 hover:text-white" title="Delete" >
                            <MdDelete className="text-xl" />
                        </button>


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

    



    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container px-6 mx-auto">
            <Breadcrum title="Users" />
            {rows ?
                <div className="min-w-md my-6">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        disableSelectionOnClick

                    />
                </div> :
                <p>User not Found!</p>
            }

            {/* Modal for Delete User */}
            {isOpenModal && <div className="fixed top-0 left-0 w-full h-full z-50">
                <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setIsOpenModal(false)}></div>

                {/* Modal*/}
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
                                <button className="rounded-sm px-3 py-1 bg-gray-200 text-gray-600" onClick={() => setIsOpenModal(false)}>Cancel</button>
                                <button className="rounded-sm px-3 py-1 bg-red-200 text-red-600" onClick={() => handleDelete(isOpenModal)}>Delete</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Users;

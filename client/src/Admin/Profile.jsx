import React, { useRef, useState, useEffect } from 'react';
import Breadcrum from './Breadcrum';
import { useDispatch, useSelector } from 'react-redux';
import { FaUpload } from "react-icons/fa6";
import { updateUser } from '../Redux/usersSlice';
import { fetchDetail } from '../Redux/userDetailSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.userDetail); // ✅ must match your slice name (profile)

    // Fetch user details on mount
    useEffect(() => {
        if (!user) {
            dispatch(fetchDetail());
        }
    }, [dispatch, user]);

    // file input ref + file state + preview url
    const selectFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // form Edit
    const [formEdit, setFormEdit] = useState(true);

    // form fields — initialize only after user is loaded
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    // update formData when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
            });
        }
    }, [user]);

    // click handler to open file dialog
    const handleSelectFile = () => {
        selectFile.current?.click();
    };

    // handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setSelectedFile(file);

        // create preview url
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    // cleanup object URL when file changes / component unmounts
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // handle text inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // submit handler - build FormData to include image
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append("username", formData.username);
        payload.append("email", formData.email);
        if (selectedFile) {
            payload.append("userImage", selectedFile);
        }

        dispatch(updateUser(payload));
        setFormEdit(true);
    };

    if (loading) return <p className="text-center py-5">Loading profile...</p>;
    if (!user) return <p className="text-center py-5">No user data found.</p>;

    return (
        <div className="container px-6 mx-auto">
            <Breadcrum title="Your Profile" />

            <div className="flex shadow bg-white p-3 rounded my-5">
                <form
                    className="w-full"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-4xl font-semibold mb-3">Personal Detail</h4>
                        </div>

                        {/* Select image */}
                        <div className="image relative">
                            <input
                                type="file"
                                accept="image/*"
                                name="userImage"
                                onChange={handleFileChange}
                                hidden
                                ref={selectFile}
                            />

                            {/* preview or placeholder */}
                            <div className="rounded-full w-20 h-20 bg-gray-100 overflow-hidden flex items-center justify-center">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : user.image ? (
                                    <img
                                        src={`http://localhost:3000${user.image}`}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl text-gray-600 uppercase">
                                        {formData.username ? formData.username[0] : "U"}
                                    </span>
                                )}
                            </div>

                            {!formEdit && (
                                <button
                                    type="button"
                                    onClick={handleSelectFile}
                                    className="absolute bottom-0 right-0 -translate-y-1/4 translate-x-1/4 bg-black text-white rounded-full p-1 text-sm cursor-pointer"
                                    aria-label="Upload profile image"
                                >
                                    <FaUpload />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Username */}
                    <div className="mb-5">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={formEdit}
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Your username"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={formEdit}
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="name@domain.com"
                            required
                        />
                    </div>

                    {formEdit ? (
                        <button
                            type="button"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mb-5 text-center"
                            onClick={() => setFormEdit(false)}
                        >
                            Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 text-center"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="text-blue-600 hover:text-white hover:bg-blue-600 border-2 border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mb-5 text-center"
                                onClick={() => setFormEdit(true)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;

import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// import react icons
import { FaShoppingCart, FaUsers, } from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import { GrCurrency } from "react-icons/gr";


const Dashboard = () => {

    const data = [
        { name: 'Jan', users: 20, orders: 10 },
        { name: 'Feb', users: 30, orders: 25 },
        { name: 'Mar', users: 45, orders: 32 },
        { name: 'Apr', users: 50, orders: 40 },
    ];

    return (
        <div className='container grid'>
            <h1 className="text-2xl font-semibold my-4">Dashboard</h1>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <div className="min-w-0 rounded-lg shadow overflow-hidden bg-white">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-orange-500 bg-orange-100 mr-4">
                            <FaUsers />
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-medium">Total customers</p>
                            <p className="text-lg font-semibold text-gray-700">765</p>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 rounded-lg shadow overflow-hidden bg-white ">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-green-500 bg-green-100 mr-4">
                            <GrCurrency />
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-medium text-gray-600">Total income</p>
                            <p className="text-lg font-semibold text-gray-700">$ 6,760.89</p>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 rounded-lg shadow overflow-hidden bg-white">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-blue-500 bg-blue-100 mr-4">
                            <FaShoppingCart />
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-medium text-gray-600">New Orders</p>
                            <p className="text-lg font-semibold text-gray-700">150</p>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 rounded-lg shadow overflow-hidden bg-white">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-teal-500 bg-teal-100 mr-4">
                            <BsChatSquareText />
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-medium text-gray-600">Unread Chats</p><p className="text-lg font-semibold text-gray-700">15</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-4">📊 Dashboard Analytics</h2>
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Users" />
                            <Line type="monotone" dataKey="orders" stroke="#10b981" name="Orders" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

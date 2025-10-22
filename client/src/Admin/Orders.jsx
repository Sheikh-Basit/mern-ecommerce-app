import React, { useEffect } from "react";
import Breadcrum from "./Breadcrum";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../Redux/OrderSlice";
import { DataGrid } from "@mui/x-data-grid";

const Orders = () => {
  const dispatch = useDispatch();
  const { data: orders = [], loading, error } = useSelector((state) => state.order);
  const { data: users = [] } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "client", headerName: "Client", flex: 2,
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
                {params.row.clientName ? params.row.clientName[0] : "U"}
              </span>
            )}
          </div>
          <span>{params.row.clientName}</span>
        </div>
      ),
    },
    { field: "orderId", headerName: "Order ID", flex: 1 },
    { field: "amount", headerName: "Amount (PKR)", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  
  
  const rows = orders.map((order, index) => {
    // find the user who placed order
    const matchedUser = users.find(u => u.email === order.userDetail?.email);
    return {
      id: index + 1,
      image: matchedUser?.image || null,
      clientName: order.userDetail?.fullName || "N/A",
      orderId: order._id || "N/A",
      amount: order.checkoutDetail[0]?.totalPrice || 0,
      status: order.checkoutDetail?.status || "Pending",
      date: new Date(order.createdAt).toLocaleDateString(),
    }
  });

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container px-6 mx-auto">
      <Breadcrum title="Orders" />
      <div className="min-w-lg my-6 pr-6 sm:pr-0">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick

        />
      </div>
    </div>
  );
};

export default Orders;

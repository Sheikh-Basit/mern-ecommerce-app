import mongoose from 'mongoose';
const {Schema} = mongoose;

const orderSchema = new Schema({
    message: {type: String, required: true},
    userDetail: {type: Object, required: true },
    checkoutDetail: {type: Object, required: true},  // temperory hold checkout data
    status: { type: String, enum: ["Pending", "Paid", "Completed"], default: "Pending" }
}, {timestamps: true});

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
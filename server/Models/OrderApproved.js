import mongoose from 'mongoose';
const {Schema} = mongoose;

const orderApprovedSchema = new Schema({
    message: {type: String, required: true},
    type: {type: String, enum:["Order"], default: "Order"},
    user: {type: Schema.Types.ObjectId, ref: "User" },
    checkoutData: {type: Object, required: true},  // temperory hold checkout data
    approved: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, {timestamps: true});

const OrderApproved = mongoose.model("OrderApproved", orderApprovedSchema);
export default OrderApproved;
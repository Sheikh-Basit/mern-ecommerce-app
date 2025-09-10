import mongoose from 'mongoose';
const {Schema} = mongoose;

const notificationSchema = new Schema({
    message: {type: String, required: true},
    type: {type: String, enum:["Order"], default: "Order"},
    user: {type: Schema.Types.ObjectId, ref: "User" },
    checkout: {type: Schema.Types.ObjectId, ref: "Checkout"},
    approved: {type: Boolean, default: false}
}, {timestamps: true});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
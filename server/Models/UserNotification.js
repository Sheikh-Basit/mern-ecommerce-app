import mongoose from 'mongoose';
const {Schema} = mongoose;

const userNotificationSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User" },
    message: {type: String, required: true},
    checkoutId: {type: Schema.Types.ObjectId, ref: "Checkout"}, 
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    createdAt: { type: Date, default: Date.now, expires: '15d'}
});

const UserNotification = mongoose.model("UserNotification", userNotificationSchema);
export default UserNotification;
import mongoose from 'mongoose';
const {Schema} = mongoose;

const notificationSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User" },
    message: {type: String, required: true},
    checkoutId: {type: Object, required: true},  // temperory hold checkout data
    status: { type: String, enum: ["Pending", "Paid", "Completed"], default: "Pending" }
}, {timestamps: true});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
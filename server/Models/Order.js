import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Project", required: true },
      quality: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered"],
    default: "pending",
  },
  address: { type: String, required: true },
}, { timestamps: true });

// Create Model
const Order = mongoose.model("Order", orderSchema);
export default Order;

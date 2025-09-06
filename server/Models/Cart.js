import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product:  { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    }
  ]
}, { timestamps: true });

// Create Model
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

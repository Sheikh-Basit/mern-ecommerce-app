import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
});

// Create Model
const Product = mongoose.model("Product", productSchema);
export default Product;

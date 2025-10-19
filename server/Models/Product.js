import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
},{timestamps:true});

// Create Model
const Product = mongoose.model("Product", productSchema);
export default Product;

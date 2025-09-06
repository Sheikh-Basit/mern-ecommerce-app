import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
});

// Create Model
const Project = mongoose.model("Project", projectSchema);
export default Project;

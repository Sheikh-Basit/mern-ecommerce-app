import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "admin"], default: "admin" },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

// Create Model
const User = mongoose.model('User', userSchema);
export default User;
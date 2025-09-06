import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DatabaseConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Atlas connection error:", err.message);
    process.exit(1); // Exit process if DB fails
  }
};

export default DatabaseConn;

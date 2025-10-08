import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import DatabaseConn from './config/db.js';
import userRoutes from "./Routes/auth.js";
import productRoutes from "./Routes/product.js";
import cartRoutes from "./Routes/cart.js";
import checkOutRoutes from "./Routes/checkout.js";
import notificationRoutes from "./Routes/notification.js";


dotenv.config();
// Database Connection
DatabaseConn();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Make uploads folder accessible publicly
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/auth",userRoutes);
app.use("/products",productRoutes);
app.use("/cart",cartRoutes);
app.use("/checkout",checkOutRoutes);
app.use("/notification",notificationRoutes);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`✅ Server running on http://localhost:${PORT}`)
})
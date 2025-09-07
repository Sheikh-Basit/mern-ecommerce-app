import express from 'express'
import dotenv from 'dotenv';
import DatabaseConn from './config/db.js';
import userRoutes from "./Routes/auth.js";
import productRoutes from "./Routes/product.js";

dotenv.config();
// Database Connection
DatabaseConn();

const app = express();

// middleware
app.use(express.json());

// Routes
app.use("/auth",userRoutes);
app.use("/products",productRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`✅ Server running on http://localhost:${PORT}`)
})
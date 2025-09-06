import express from 'express'
import dotenv from 'dotenv';
import DatabaseConn from './config/db.js';
import userRoutes from "./Routes/users.js";

dotenv.config();
// Database Connection
DatabaseConn();

const app = express();

// middleware
app.use(express.json());

// Routes
app.use("/auth",userRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`✅ Server running on http://localhost:${PORT}`)
})
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const fetchUser = async (req, res, next) =>{
    try {
        const token = req.header('authToken');
     if (!token) {
            return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    const data = await jwt.verify(token,secretKey);
    req.user = data;
    next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    
}

export const isAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
}

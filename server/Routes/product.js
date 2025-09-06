import express from 'express';
import User from '../Models/User';
import Product from '../Models/Product'
const router = express.Router();

// 3 => Get All Products using the GET request: http://localhost:3000/products/
router.get("/", fetchUser, async (req, res) => {
  try {
    const userID = req.user;
    
    // check user is logged in or not
    const user = await User.findById(userID).select("-password");
    if(!user){
        return res.status(401).json({error: "You must be login first"})
    }

    const products = await Product.find({user:userID});

    res.json(products)
    

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
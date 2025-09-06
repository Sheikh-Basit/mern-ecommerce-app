import express from "express";
import Product from "../Models/Product.js";
import {fetchUser} from "../middleware/fetchUser.js";
import User from "../Models/User.js";
const router = express.Router();

// 1 => Get All Products using the GET request: http://localhost:3000/products/
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2 => Add Product (Must be admin) using the POST request: http://localhost:3000/products/addProduct
router.post("/addProduct", fetchUser, async (req, res) => {
  try {
    const userID = req.user;

    const user = await User.findById(userID).select("-password");

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "You have no access to add the product" });
    }

    const { title, description, price, category, stock, imageUrl } = req.body;

    let product = await Product.find(title);
    if(product){
        return product.stock += 1;
    }
    product = await new Product({title,description,price,category,stock,imageUrl});
    product.save();

    res.status(201).json({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import express from "express";
import Product from "../Models/Product.js";
import { body, validationResult } from "express-validator";

// Import middleware to check the role of user
import { fetchUser, isAdmin } from "../middleware/fetchUser.js";
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

// 2 => Add Product (Only admin) using the POST request: http://localhost:3000/products/addProduct
router.post(
  "/addProduct",
  [
    body("title").notEmpty().withMessage("Title must be required"),
    body("description").optional(),
    body("price").notEmpty().withMessage("Price is required"),
    body("category").notEmpty().withMessage("Category must be required"),
    body("stock").isNumeric().withMessage("Stock must be a number"),
    body("imageUrl").optional().isURL().withMessage("Image URL must be valid"),
  ],
  fetchUser,
  isAdmin,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
      }
      const { title, description, price, category, stock, imageUrl } = req.body;
      const userid = req.user.userID;

      let product = await Product.findOne({ title });
      if (product) {
        return res
          .status(400)
          .json({ message: "Product already added with same title" });
      }
      product = new Product({
        user: userid,
        title,
        description,
        price,
        category,
        stock,
        imageUrl,
      });
      product.save();

      res.status(201).json({ message: "Product added successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// 3 => Update Product (Only admin) using the POST request: http://localhost:3000/products/updateProduct/:id
router.put("/updateProduct/:id", fetchUser, isAdmin, async (req, res) => {
  try {
    const { title, description, price, category, stock, imageUrl } = req.body;
    const newProduct = {};

    if (title) {
      newProduct.title = title;
    }
    if (description) {
      newProduct.description = description;
    }
    if (price) {
      newProduct.price = price;
    }
    if (category) {
      newProduct.category = category;
    }
    if (stock) {
      newProduct.stock = stock;
    }
    if (imageUrl) {
      newProduct.imageUrl = imageUrl;
    }

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );

    res.status(201).json({ message: "Product updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4 => Delete Product (Only admin) using the POST request: http://localhost:3000/products/deleteProduct/:id
router.delete("/deleteProduct/:id", fetchUser, isAdmin, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

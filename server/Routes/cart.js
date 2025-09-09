import express from "express";

//import middleware (user must be loggedin)
import { fetchUser } from "../middleware/fetchUser.js";
import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

const router = express.Router();

// 1 => Get All Cart Products using the GET request: http://localhost:3000/cart/
router.get("/", fetchUser, async (req, res) => {
  try {
    // fetch the login user id
    const userid = req.user.userID;

    const cart = await Cart.find({ user: userid });
    
    res.send(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2 =>  Add Products in the Cart using the POST request: http://localhost:3000/cart/addItem/:productid
router.post("/addToCart/:productId", fetchUser, async (req, res) => {
  try {
    // get the user id from middleware
    const userid = req.user.userID;

    // fetch product id from url
    const productID = req.params.productId;

    //check product is exist or not
    const product = await Product.findById(productID);
    
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    // get the product price
    const productPrice = product.price;

    // find cart of user
    let cart = await Cart.findOne({ user: userid });
    
    if (!cart) {
      // create new cart
      cart = new Cart({
        user: userid,
        items: [{ product: productID, quantity: 1, totalPrice:productPrice }],
      });
    } else {
      // Check product is exist in cart
      const cartItemsProduct = cart.items.find((item) => item.product.toString() === productID);
      // Check if product is exist then
      if (cartItemsProduct) {
        // increase qyuantity
        cartItemsProduct.quantity += 1;
        cartItemsProduct.totalPrice = cartItemsProduct.quantity * productPrice;
      } else {
        // Push new product
        cart.items.push({ product: productID, quantity: 1, totalPrice: productPrice });
      }
    }

    await cart.save();
    res.status(200).json({cart, message:"Item added in cart"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3 =>  Update Product in Cart using the PUT request: http://localhost:3000/cart/updateItem/:productid
router.put("/updateCart/:productId", fetchUser, async (req, res) => {
  try {
    // get the user id from middleware
    const userid = req.user.userID;

    // fetch product id from url
    const productID = req.params.productId;

    //check product is exist or not
    const product = await Product.findById(productID);
    
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    // find cart of user
    let cart = await Cart.findOne({ user: userid });
    
    if (!cart) {
      return res.json({ message: "No item in the cart" });
    }
    // Check product is exist in cart
    const updatedProduct = cart.items.find((item) => item.product.toString() === productID);
    if(!updatedProduct){
        return res.status(400).json({message:"Product not fount in the cart"})
    }

    // Update the product
    updatedProduct.quantity = req.body.quantity;

    await cart.save();
    res.status(200).json({message:"Item updated successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4 =>  Delete Product from Cart using the DELETE request: http://localhost:3000/cart/deleteItem/:productid
router.delete("/deleteFromCart/:productId", fetchUser, async (req, res) => {
  try {
    // get the user id from middleware
    const userid = req.user.userID;

    // fetch product id from url
    const productID = req.params.productId;

    //check product is exist or not
    const product = await Product.findById(productID);
    
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    // find cart of user
    let cart = await Cart.findOne({ user: userid });
    
    if (!cart) {
      return res.json({ message: "No item in the cart" });
    }

    // if no item in the cart
    if(cart.items.length === 1){
        await Cart.deleteOne({user: userid})
        return res.status(404).json({message: "Item deleted successfully"})
    }

    // Check product is exist in cart
    const deletedProduct = cart.items.find((item) => item.product.toString() === productID);
    if(!deletedProduct){
        return res.status(400).json({message:"Product not fount in the cart"})
    }

    // Delete the product
    cart.items.pull({product:productID});

    await cart.save();
    res.status(200).json({message:"Item deleted successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5 =>  Clear Cart using the DELETE request: http://localhost:3000/cart/clearCart
router.delete("/clearCart", fetchUser, async (req, res) => {
  try {
    // get the user id from middleware
    const userid = req.user.userID;
    if(!userid){
      return res.status(400).json({error: "You have not access to delete"});
    }

    // Clear the Cart
    await Cart.deleteOne({user: userid})
    
    res.status(200).json({message:"Cart clear successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

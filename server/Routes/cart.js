import express from 'express'

//import middleware (user must be loggedin)
import { fetchUser } from '../middleware/fetchUser.js';
import Cart from '../Models/Cart.js';
import Product from '../Models/Product.js';

const router = express.Router();

// 1 => Get All Cart Products using the GET request: http://localhost:3000/cart/
router.get('/',fetchUser, async(req,res)=>{
    try {
        // fetch the login user id
        const userid = req.user.userID;

        const cartItems = await Cart.find({userid})
        res.send(cartItems)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// 2 =>  Add Products in the Cart using the POST request: http://localhost:3000/cart/addItem/:productid
router.post('/addItem/:productId',fetchUser, async(req,res)=>{
    try {
        // fetch the login user id
        const userid = req.user.userID;

        // fetch product id from url
        const productID = req.params.productId;

        //check product is exist or not
        const product = await Product.findById(productID);
        if(!product){
            return res.status(400).json({error: "Product not found"});
        }

        // find cart of user
        const cart = await Cart.findOne({user: userid});
        if(!cart){
            // create new cart
            cart = new Cart({
                user: userid,
                items:[{product:productID, quantity: 1}]
            });
        } else {
            // check if product is exist in cart
            const itemIndex = cart.items.findIndex((item) => item.product.toString() === productID)

            // if product exist in cart then
            if(itemIndex > -1){
                // increase quantity
                cart.items[itemIndex].quantity += 1;
            }else {
                // push new product in the cart
                cart.items.push({product:productID, quantity: 1});
            }
        }

        await cart.save();
        res.status(200).json(cart);


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;
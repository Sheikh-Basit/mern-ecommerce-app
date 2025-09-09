import express from "express";
import { fetchUser } from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
import Cart from "../Models/Cart.js";
import Checkout from "../Models/CheckOut.js";
const router = express.Router();

// 1 => Get Checkout Detail using the GET request: http://localhost:3000/checkout/
router.get(
    "/",
    [
        body("fullName").notEmpty().withMessage("Name must be required"),
        body("email").isEmail().withMessage("Please enter the correct email address"),
        body("phone").notEmpty().withMessage("Phone number is required"),
        body("address").isLength({ min: 5 }).withMessage("Address must be atleast five character long"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("postalCode").isNumeric().isLength({ min: 4 }).withMessage("Enter atleast 4 character and must be a number"),
    ],
    fetchUser,
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ error: result.array() });
            }

            //   Get data from body
            const { fullName, email, phone, address, city, country, postalCode } = req.body;

            // Get user id from middleware
            const userid = req.user.userID;

            // Get Cart items from loggedin user
            const cart = await Cart.findOne({user: userid})
            if(!cart){
                return res.status(404).json({error:"Your Cart is empty"});
            }
            console.log(cart._id)

            const totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);


            const userDetails = {fullName, email, phone, address, city, country, postalCode};

            // Prepare Checkout

            const checkout = await Checkout.findOne({user: userid});
            if(!checkout){
                // Create new checkout for loggedin user
                checkout = new Checkout({
                    user: userid,
                    userDetails: userDetails,
                    cart: [{cart:cart._id}],
                    totalAmount: totalAmount,
                    paymentMethod:"COD",
                    paymentStatus:"Pending",
                    orderStatus:"Pending"
    
                })
                await checkout.save();
                return res.status(200).json({message:"Order Successfull", checkout})
            }

            checkout.items.push({cart:cart._id})


            res.json({message:"Order Successfull", checkout})



        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

export default router;

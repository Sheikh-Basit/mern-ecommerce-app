import express from "express";
import { fetchUser } from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
import Cart from "../Models/Cart.js";
import Checkout from "../Models/CheckOut.js";
import OrderApproved from "../Models/OrderApproved.js";
const router = express.Router();

// 1 => Get Checkout Detail using the POST request: http://localhost:3000/checkout/
router.post(
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

            // Get user id from middleware
            const userid = req.user.userID;

            // Get Cart items from loggedin user
            const cart = await Cart.findOne({ user: userid })
            if (!cart || !cart.items || cart.items.length === 0) {
                return res.status(404).json({ error: "Your Cart is empty" });
            }
            // find total amount
            const totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

            // User checkout detail
            const { fullName, email, phone, address, city, country, postalCode } = req.body;
            const userDetails = { fullName, email, phone, address, city, country, postalCode };

            // Prepare temperory Checkout not save in the DB
            const checkoutData = {
                user: userid,
                userDetails,
                orderSummary: [{
                    cart: {
                        cartId: cart._id,
                        cartItems: cart.items 
                    },
                    totalAmount,  // sum of all product totalprice in the cart
                    paymentMethod: "COD",
                    paymentStatus: "Pending",
                    orderStatus: "Pending"
                }],

            }

            // create notification for admin for order approved
            await OrderApproved.create({
                message: "New order placed - waiting for approval",
                user: userid,
                checkoutData
            })

            // Clear the cart
            await Cart.deleteOne({ user: userid })

            return res.status(200).json({ message: "Wait for admin approval. Your order is pending" })
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

export default router;
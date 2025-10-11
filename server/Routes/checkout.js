import express from "express";
import { fetchUser } from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
import Cart from "../Models/Cart.js";
import Checkout from "../Models/CheckOut.js";
import Orders from "../Models/Orders.js";
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


            // Build order summary object
            const orderSummary = {
                cart: {
                    cartId: cart._id,
                    cartItems: cart.items,
                },
                totalAmount,
                paymentMethod: "COD",
                paymentStatus: "Pending",
                orderStatus: "Pending",
            };

            // Prepare Checkout

            let checkout = await Checkout.findOne({ user: userid });
            if (!checkout) {
                // Create new checkout
                checkout = new Checkout({
                    user: userid,
                    userDetails,
                    orderSummary: [orderSummary],

                })
            } else {
                // Prevent duplicate cart in checkout
                const alreadyExists = checkout.orderSummary.some(
                    (item) => item.cart.cartId.toString() === cart._id.toString()
                );

                if (!alreadyExists) {
                    checkout.orderSummary.push(orderSummary);
                } else {
                    return res.status(400).json({ message: "This cart is already in checkout" });
                }
            }


            // Save checkout
            await checkout.save();

            // Create new Order
            await Orders.create({
                message: "New order placed",
                userDetail: userDetails,
                checkoutDetail: cart.items,
                status: "Pending",
            });

            // Clear Cart after checkout
            await Cart.findOneAndDelete({ user: userid });

            return res.status(200).json({ message: "Checkout created successfully", checkout })



        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

export default router;

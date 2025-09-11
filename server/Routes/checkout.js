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

            // Prepare Checkout

            let checkout = await Checkout.findOne({ user: userid });
            if (!checkout) {
                // Create new checkout
                checkout = new Checkout({
                    user: userid,
                    userDetails,
                    items: [{ cart: cart._id }],
                    totalAmount,
                    paymentMethod: "COD",
                    paymentStatus: "Pending",
                    orderStatus: "Pending"

                })

                // Generate admin notification for order approved
                await OrderApproved.create({
                    message: "New order placed",
                    user: userid,
                    checkout: checkout._id
                })

                // Need Approval from Admin
                const adminApproval = await OrderApproved.findOne({ user: userid });
                if (!adminApproval.approved) {
                    return res.json({ message: "Wait for Admin Approval" });
                }
                await checkout.save();


                return res.status(200).json({ message: "Checkout created successfully", checkout })
            }

            // check if the cart is already exist
            const itemExist = checkout.items.some(item => item.cart.toString() === cart.id.toString())
            if (itemExist) {
                const cart = await Cart.findOne({ user: userid })
                // find total amount
                const totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
                checkout.totalAmount = totalAmount;
                checkout.userDetails = userDetails;


                // Generate admin notification for order approved
                await OrderApproved.create({
                    message: "New order placed",
                    user: userid,
                    checkout: checkout._id
                })

                // Need Approval from Admin
                const adminApproval = await OrderApproved.findOne({ user: userid });
                if (!adminApproval.approved) {
                    return res.json({ message: "Wait for Admin Approval" });
                }

                await checkout.save();

                return res.status(200).json({ message: "Checkout updated with latest cart totals", checkout })
            }

            checkout.items.push({ cart: cart._id })

            // Generate admin notification for order approved
            await OrderApproved.create({
                message: "New order placed",
                user: userid,
                checkout: checkout._id
            })

            // Need Approval from Admin
            const adminApproval = await OrderApproved.findOne({ user: userid });
            if (!adminApproval.approved) {
                return res.json({ message: "Wait for Admin Approval" });
            }

            await checkout.save();


            return res.status(200).json({ message: "Checkout created successfully", checkout })



        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

export default router;

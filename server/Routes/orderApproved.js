import express from 'express';
import { fetchUser, isAdmin } from '../middleware/fetchUser.js';
import OrderApproved from '../Models/OrderApproved.js';
import Checkout from '../Models/CheckOut.js';
const router = express.Router();

// 1 => Get all Notification (Access only Admin) using the GET request: http://localhost:3000/order/getAllOrders
router.get('/getAllOrders', fetchUser, isAdmin, async (req, res) => {
    try {
        const orders = await OrderApproved.find({ type: "Order" })
            .populate("user", "username email");

        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// 2 => Admin approved order (Access only Admin) using the GET request: http://localhost:3000/order/orderApproved
router.post('/orderApproved/:id', fetchUser, isAdmin, async (req, res) => {
    try {
        const { approval } = req.body;

        const orderForApproval = await OrderApproved.findById(req.params.id);
        if (!orderForApproval) {
            return res.status(404).json({ message: "Order not found" });
        }
        console.log(orderForApproval.checkoutData)

        // If admin approves
        if (approval === "Approved") {
            let checkout = await Checkout.findOne({ user: orderForApproval.user });

            if (!checkout) {
                // Create new checkout with all order data
                checkout = new Checkout(orderForApproval.checkoutData);
                await checkout.save();
            } else {
                // Avoid duplicate cart
                const newCartId = orderForApproval.checkoutData.cart.toString();
                const alreadyExist = checkout.items.some(
                    item => item.cart.toString() === newCartId
                );

                if (!alreadyExist) {
                    checkout.items.push({ cart: newCartId });
                    await checkout.save();
                }
            }

            orderForApproval.approved = "Approved";
            await orderForApproval.save();

            return res.status(200).json({ message: "Order approved and saved", checkout });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;
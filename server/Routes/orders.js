import express from 'express';
import { fetchUser, isAdmin } from '../middleware/fetchUser.js';
import Orders from '../Models/Orders.js';
const router = express.Router();

// 1 => Get all Orders (Access only Admin) using the GET request: http://localhost:3000/orders/getAllOrders
router.get('/getAllOrders', fetchUser, isAdmin, async (req, res) => {
    try {
        const orders = await Orders.find();
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})



export default router;
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

// 2 => Update order status (Access only Admin) using the PUT request: http://localhost:3000/orders/updateOrderStatus/:id
router.put("/updateOrderStatus/:id", async (req, res) => {
  try {
    const order = await Orders.findByIdAndUpdate(
      req.params.id,
      { "status": req.body.status },
      { new: true }
    );
    res.status(200).json({message:"Order Status Updated", order});
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});




export default router;
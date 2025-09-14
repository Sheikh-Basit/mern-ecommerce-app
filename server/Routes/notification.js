import express from 'express';
import { fetchUser, isAdmin } from '../middleware/fetchUser.js';
import Notification from '../Models/Notifications.js';
const router = express.Router();

// 1 => Get all Notification (Access only Admin) using the GET request: http://localhost:3000/notification/getAll
router.get('/getAll', fetchUser, isAdmin, async (req, res) => {
    try {
        const orders = await Notification.find()
            .populate("user", "username email")
            .populate("user", "username email");

        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})



export default router;
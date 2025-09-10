import express from 'express';
import { fetchUser, isAdmin } from '../middleware/fetchUser.js';
import Notification from '../Models/Notification.js';
const router = express.Router();

// 1 => Get all Notification (Access only Admin) using the GET request: http://localhost:3000/notification/getAllNotification
router.get('/getAllNotification', fetchUser, isAdmin, async(req, res)=>{
    try {
        const notificaton = await Notification.find({type: "Order"})
        .populate("user", "username email")
        .populate("checkout", "userDetails orderStatus totalAmount");

        res.json(notificaton)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// 2 => Admin approved order (Access only Admin) using the GET request: http://localhost:3000/notification/orderApproved
router.post('/orderApproved/:id', fetchUser, isAdmin, async(req, res)=>{
    try {
        const notificaton = await Notification.findByIdAndUpdate(
            req.params.id, {$set: {approved:req.body.approved}}, {new: true});

        if(!notificaton){
            return res.status(404).json({message:"Notification not found"})
        }

        await notificaton.save();

        res.json({message: "Order approved successfully"})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;
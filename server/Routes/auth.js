import express from "express";
import User from "../Models/User.js";
import { body, validationResult } from "express-validator";

// Import bcrypt for convert the plain password to hashed
import bcrypt from "bcrypt";

// Import jwt for authentication
import jwt from "jsonwebtoken";

// import Middleware fetch user
import { fetchUser, isAdmin } from "../middleware/fetchUser.js";

// Import crypto to generate random hashedToken for forgot password
import crypto from "crypto";

const router = express.Router();

// 1 => Create new User using the post request: http://localhost:3000/auth/register
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("User name must be enter"),
    body("email").isEmail().withMessage("Enter the correct Email Address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 character long"),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ error: result.array() });
      }
      const { username, email, password } = req.body;

      const existinguser = await User.findOne({ email });
      if (existinguser) {
        return res.send({
          error: `Email already exist!`,
        });
      }

      const salt = 10;
      const hashpassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashpassword,
        role: "user",
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// 2 => Login User using the post request: http://localhost:3000/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter the correct Email Address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 character long"),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ error: result.array() });
      }
      const { email, password } = req.body;

      // Check email is exist or not
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter the correct login credentials" });
      }

      // Compare the passwords
      const originalpassword = await bcrypt.compare(password, user.password);
      if (!originalpassword) {
        return res
          .status(400)
          .json({ error: "Please enter the correct login credentials" });
      }

      // Payload for generating the token
      const payload = { userID: user._id, role: user.role };

      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey);

      res.send({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// 3 => Get User Data using the GET request: http://localhost:3000/auth/getUser
router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const userID = req.user.userID;

    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4 => Get All Users (Access Only Admin) using the GET request: http://localhost:3000/auth/admin/users
router.get("/admin/users", fetchUser, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5 => Update User using the GET request: http://localhost:3000/auth/updateUser
router.put("/updateUser", fetchUser, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = {};
    if (username) {
      newUser.username = username;
    }
    if (email) {
      const existinguser = await User.findOne({ email });
      if (existinguser && existinguser._id.toString() !== req.user.userID) {
        return res.send({
          error: `Email already exist! Please enter the unique email address`,
        });
      }

      newUser.email = email;
    }
    if (password) {
      const salt = 10;
      newUser.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userID,
      { $set: newUser },
      { new: true }
    ).select("-password");
    res.json({ message: "Profile Updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6 => Delete User (Access Only Admin) using the GET request: http://localhost:3000/auth/admin/deleteUser
router.delete("/admin/deleteUser/:id", fetchUser, isAdmin, async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Find the admin user and protect from deletion
    const adminUser = await User.findOne().sort({ createdAt: 1 });
    if (adminUser._id.toString() === req.params.id) {
      return res.status(403).json({ error: "Admin cannot be deleted" })
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7 => Forgot Password using the POST request: http://localhost:3000/auth/forgotPassword
router.post(
  "/forgotPassword",
  [body("email").isEmail().withMessage("Enter the correct Email Address")],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ error: result.array() });
      }
      const { email } = req.body;

      // check the user with entered email is exist or not
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: "Please enter the valid email address" });
      }

      // generate a new token for reset the password
      const resetToken = crypto.randomBytes(32).toString("hex");

      // convert the plain token into hashed before save into the DB
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // store hashed token with expire time into DB
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // expire in 15 mins

      await user.save();

      // TODO: Send `resetToken` to user via email (not hashed)
      res
        .status(200)
        .json({ message: "Reset link sent to email", resetToken });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// 8 => Reset Password using the POST request: http://localhost:3000/auth/forgotPassword/:token
router.post(
  "/forgotPassword/:token",
  [
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 character long"),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ error: result.array() });
      }
      const { password } = req.body;

      // Hash the token from URL
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      // Find user with this token and valid expiry
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }, // check not expired
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Hash new password before saving
      const salt = 10;
      user.password = await bcrypt.hash(password, salt);

      // Clear reset fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res
        .status(200)
        .json({ message: "Password reset successful. You can now log in." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;

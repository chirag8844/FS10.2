import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Post from "../models/Post.js"; // <-- import your Post model
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// ✅ Get logged-in user + their posts
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Fetch posts authored by this user
    const posts = await Post.find({ author: decoded.id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    console.error("Error in /auth/me:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

export default router;

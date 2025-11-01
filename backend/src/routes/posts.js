import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { authenticate } from "../middleware/auth.js"; 

const router = express.Router();

// 🖼 Multer setup for local image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ================================
   ROUTES
================================ */

// 📌 1. Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 2. Get a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 3. Create a new post (with optional image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newPost = await Post.create({
      title,
      content,
      author,
      imageUrl,
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📌 4. Like or unlike a post
router.put("/:id/like", async (req, res) => {
  try {
    const { userId } = req.body; // userId must be sent from frontend
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likedBy.includes(userId);
    if (alreadyLiked) {
      post.likedBy.pull(userId);
      post.likes -= 1;
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();
    res.json({ message: alreadyLiked ? "Post unliked" : "Post liked", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 5. Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/:id/like", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // user id from token payload — ensure this matches how you sign token (id or _id)
    const userId = req.user.id ?? req.user._id ?? req.user; // tolerant

    if (!userId) return res.status(401).json({ message: "Invalid token payload" });

    // Check if user already liked (use string compare for ObjectId compatibility)
    const alreadyLiked = post.likes.some((uid) => uid.toString() === userId.toString());

    if (alreadyLiked) {
      // Unlike: remove this user from likes
      post.likes = post.likes.filter((uid) => uid.toString() !== userId.toString());
    } else {
      // Like: add user only if not already present
      post.likes.push(userId);
    }

    await post.save();

    return res.json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (err) {
    console.error("Like route error:", err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;

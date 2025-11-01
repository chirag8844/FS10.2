import express from "express";
import authRoutes from "./auth.js";
import postRoutes from "./posts.js";
import commentRoutes from "./comments.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export default router;

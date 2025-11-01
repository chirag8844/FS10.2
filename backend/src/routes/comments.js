import express from "express";
import { addComment } from "../controllers/commentsController.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

router.post("/:postId", authenticate, addComment);

export default router;

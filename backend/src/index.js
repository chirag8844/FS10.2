import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/collect.js"; 
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";



dotenv.config();
connectDB();

const app = express();
app.use("/comments", commentRoutes);
app.use(cors());
app.use(express.json());

// All routes are grouped under /api
app.use("/api", routes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

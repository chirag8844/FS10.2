import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user.id });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
};

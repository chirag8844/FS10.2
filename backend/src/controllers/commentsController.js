import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user.id,
      text: req.body.text,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

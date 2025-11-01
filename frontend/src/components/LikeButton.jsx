import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import API from "../api/api";

function LikeButton({ postId, initialLikes, userId, token }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  // Load initial like state for this user
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${postId}`);
        const post = res.data;
        setLikes(post.likes?.length || 0);
        setLiked(post.likes?.some((id) => id === userId));
      } catch (err) {
        console.error("Fetch like state failed:", err);
      }
    };
    fetchPost();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      const res = await API.post(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update instantly based on response
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  return (
    <button
      onClick={handleLike}
      style={{
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Heart
        size={18}
        fill={liked ? "red" : "transparent"}
        color={liked ? "red" : "gray"}
        style={{
          transition: "transform 0.2s ease-in-out",
          transform: liked ? "scale(1.2)" : "scale(1)",
        }}
      />
      <span style={{ transition: "0.2s" }}>{likes}</span>
    </button>
  );
}

export default LikeButton;

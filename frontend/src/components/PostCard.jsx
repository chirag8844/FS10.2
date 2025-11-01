import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import "./PostCard.css";

function PostCard({ post }) {
  // Get logged-in user and token from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="post-card">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      )}
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <Link to={`/post/${post._id}`} className="read-more">
        Read More
      </Link>
      <div className="author">By {post.author.username}</div>

      {/* ✅ Pass userId and token properly */}
      <LikeButton
        postId={post._id}
        initialLikes={post.likes?.length || 0}
        userId={user?._id}
        token={token}
      />
    </div>
  );
}

export default PostCard;

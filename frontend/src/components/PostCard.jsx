import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
      <div className="author">By {post.author.username}</div>
    </div>
  );
}

export default PostCard;

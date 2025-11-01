import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="home-container">
      <div className="blog-header">
        <h1>📰 All Blog Posts</h1>
        <p className="subtitle">Share your ideas, stories, and thoughts with the world 🌍</p>
      </div>

      {posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="no-posts">No posts yet. Be the first to write one!</p>
      )}
    </div>
  );
}

export default Home;

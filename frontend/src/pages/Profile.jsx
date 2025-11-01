// Profile page: shows current user info and their posts.
// NOTE: This assumes you have a backend route GET /auth/me that returns user + posts.
// If /auth/me is not implemented, see the comment below for a quick backend snippet.

import { useEffect, useState } from "react";
import API from "../api/api";
import PostCard from "../components/PostCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // expects { user: {...}, posts: [...] } or adapt to your backend response
        const res = await API.get("/auth/me");
        setUser(res.data.user ?? res.data);
        setPosts(res.data.posts ?? []);
      } catch (err) {
        console.error("Fetch profile error:", err.response ?? err.message);
        // fallback: if backend doesn't provide /auth/me, try token decode or fetch user posts by author
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{user.username}'s Profile</h1>
      <p>{user.email}</p>
      {user.bio && <p>{user.bio}</p>}

      <hr style={{ margin: "20px 0" }} />
      <h2>Your Posts</h2>
      {posts.length === 0 && <div>No posts yet</div>}
      <div style={{ display: "grid", gap: 12 }}>
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

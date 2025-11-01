// NewPost page - creates a post (requires token)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return alert("Add title and content");
    try {
      const res = await API.post("/posts", { title, content });
      // backend returns created post (res.data)
      nav(`/post/${res.data._id}`);
    } catch (err) {
      console.error("Create post error:", err.response ?? err.message);
      alert(err.response?.data?.message || "Unable to create post. Are you logged in?");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create New Post</h1>
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={handleCreate}>Publish</button>
      </div>
    </div>
  );
}

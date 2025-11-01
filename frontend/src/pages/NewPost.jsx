import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import ImageUpload from "../components/ImageUpload";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const nav = useNavigate();

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return alert("Add title and content");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      nav(`/post/${res.data._id}`);
    } catch (err) {
      console.error("Create post error:", err);
      alert(err.response?.data?.message || "Unable to create post");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create New Post</h1>
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

      <ImageUpload onFileSelect={setImage} />

      <button onClick={handleCreate} style={{ marginTop: 12 }}>
        Publish
      </button>
    </div>
  );
}

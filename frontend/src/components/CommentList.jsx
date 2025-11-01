// shows comments for a post and allows adding a comment (if logged in)
import { useEffect, useState } from "react";
import API from "../api/api";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!postId) return;
    const fetchComments = async () => {
      try {
        const res = await API.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Fetch comments error:", err);
      }
    };

    fetchComments();

    // If using Socket.IO for realtime, uncomment below and install socket.io-client
    // import { io } from "socket.io-client";
    // const socket = io("http://localhost:5000");
    // socket.emit("joinPost", postId);
    // socket.on("newComment", c => setComments(prev => [...prev, c]));
    // return () => { socket.emit("leavePost", postId); socket.disconnect(); };

  }, [postId]);

  const submitComment = async () => {
    if (!text.trim()) return;
    if (!token) return alert("Please login to comment");

    try {
      const res = await API.post(`/comments/${postId}`, { text });
      // server returns created comment
      setComments((p) => [...p, res.data]);
      setText("");
    } catch (err) {
      console.error("Add comment error:", err.response ?? err.message);
      alert(err.response?.data?.message || "Could not add comment");
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <div style={{ marginBottom: 12 }}>
        {comments.length === 0 && <div>No comments yet — be first!</div>}
        {comments.map((c) => (
          <div key={c._id} style={{ borderTop: "1px solid #eee", padding: 8 }}>
            <strong>{c.author?.username ?? "User"}</strong>
            <div>{c.text}</div>
            <small style={{ color: "#666" }}>{new Date(c.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <div>
        <textarea
          rows={3}
          cols={50}
          placeholder={token ? "Write a comment..." : "Login to comment"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!token}
        />
        <br />
        <button onClick={submitComment} disabled={!token || !text.trim()}>
          Add Comment
        </button>
      </div>
    </div>
  );
}

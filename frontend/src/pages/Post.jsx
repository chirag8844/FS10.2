import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import CommentList from "../components/CommentList";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    API.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Fetch post error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <div style={{ color: "#666", marginBottom: 12 }}>
        by {post.author?.username ?? "Unknown"} •{" "}
        {new Date(post.createdAt).toLocaleString()}
      </div>
      <div style={{ whiteSpace: "pre-wrap", marginBottom: 20 }}>{post.content}</div>

      <CommentList postId={id} />
    </div>
  );
}

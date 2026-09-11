import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../data/api.js";
import { blogImageMap } from "../data/content.js";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => { api.get(`/blogs/${id}`).then(setBlog).catch(() => setBlog(null)); }, [id]);

  if (!blog) return <div className="pt-40 text-center text-muted">Loading post…</div>;

  return (
    <div className="pt-28 pb-24 px-6 md:px-10">
      <div className="wrap max-w-2xl">
        <Link to="/blogs" className="text-sm text-teal">← Back to journal</Link>
        <p className="text-xs text-muted mt-6 mb-2">{blog.date} · {blog.author}</p>
        <h1 className="text-3xl md:text-4xl mb-6">{blog.title}</h1>
        <img src={blogImageMap[blog.id]} alt={blog.title} className="w-full h-72 object-cover rounded-md mb-8" />
        <p className="text-ink/80 leading-relaxed text-lg">{blog.content}</p>
      </div>
    </div>
  );
}

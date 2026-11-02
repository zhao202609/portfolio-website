import { useState, useEffect } from 'react';
import api from '../api.js';
import BlogPostCard from '../components/BlogPostCard.jsx';

// Blog list: fetches GET /api/blog.
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/blog');
        setPosts(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <section>
      <div className="page-head">
        <h1>Blog</h1>
        <p>Short notes from my labs — what I learned about Express, MongoDB and authentication.</p>
      </div>
      {posts.length === 0 ? (
        <p className="status">No blog posts yet.</p>
      ) : (
        <div className="grid">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

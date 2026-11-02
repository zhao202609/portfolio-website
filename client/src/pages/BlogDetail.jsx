import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

// Blog post detail: fetches GET /api/blog/:id and lets a logged-in user
// post a comment via POST /api/blog/:postId/comments.
export default function BlogDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

  const loadPost = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/blog/${id}`);
      setPost(res.data.post);
      setComments(res.data.comments);
      setError('');
    } catch (err) {
      setError('Failed to load this blog post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;
    try {
      setSubmitting(true);
      setCommentError('');
      const res = await api.post(`/api/blog/${id}/comments`, { body: commentBody });
      setComments((prev) => [res.data, ...prev]);
      setCommentBody('');
    } catch (err) {
      setCommentError(
        err.response?.data?.message || 'Failed to post comment. You may need to log in.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!post) return <p className="status">Post not found.</p>;

  return (
    <article className="blog-detail">
      <h1>{post.title}</h1>
      <p className="meta">By {post.author?.username || 'Unknown'}</p>
      <div className="post-content">{post.content}</div>

      <section className="comments">
        <h2>Comments ({comments.length})</h2>

        {isAuthenticated ? (
          <form onSubmit={handleComment} className="form comment-form">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
              required
            />
            {commentError && <p className="status error">{commentError}</p>}
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="status">
            Please <a href="/login">log in</a> to leave a comment.
          </p>
        )}

        {comments.length === 0 ? (
          <p className="status">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="comment">
              <p className="meta">{c.author?.username || 'Unknown'}</p>
              <p>{c.body}</p>
            </div>
          ))
        )}
      </section>
    </article>
  );
}

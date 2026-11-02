import { Link } from 'react-router-dom';

// Reusable card for a single blog post in the list.
export default function BlogPostCard({ post }) {
  const authorName = post.author?.username || 'Unknown';
  const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '';

  return (
    <div className="card">
      <div className="card-body">
        <h3>{post.title}</h3>
        <p className="meta">
          By {authorName} {date && `· ${date}`}
        </p>
        <p className="excerpt">{post.content?.substring(0, 120)}...</p>
        <Link to={`/blog/${post._id}`} className="read-more">
          Read more
        </Link>
      </div>
    </div>
  );
}

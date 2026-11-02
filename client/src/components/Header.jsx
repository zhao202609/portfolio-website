import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Auth-aware navigation bar: shows Login/Register for guests,
// and Logout + Admin Dashboard for authenticated users.
export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          My Portfolio
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>

          {isAuthenticated ? (
            <>
              <Link to="/admin" className="admin-link">
                Admin Dashboard
              </Link>
              <span className="welcome-user">Hi, {user?.username}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

import { useState, useEffect } from 'react';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

const emptyProject = {
  title: '',
  description: '',
  imageUrl: '',
  repoUrl: '',
  liveUrl: '',
  category: 'Full-Stack',
  tags: '',
};
const CATEGORIES = ['HTML/CSS', 'JavaScript', 'React', 'Full-Stack', 'Data'];
const emptyPost = { title: '', content: '' };

// Admin Dashboard (protected): full CRUD for Projects and Blog Posts.
// All requests automatically carry the JWT via the axios interceptor.
export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState('projects');

  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [postForm, setPostForm] = useState(emptyPost);
  const [editingPostId, setEditingPostId] = useState(null);

  const loadProjects = async () => {
    const res = await api.get('/api/projects');
    setProjects(res.data);
  };
  const loadPosts = async () => {
    const res = await api.get('/api/blog');
    setPosts(res.data);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([loadProjects(), loadPosts()])
      .catch(() => setMessage('Failed to load data.'))
      .finally(() => setLoading(false));
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  };

  // ---- Project handlers ----
  const submitProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      tags:
        typeof projectForm.tags === 'string'
          ? projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : projectForm.tags,
    };
    if (editingProjectId) {
      await api.put(`/api/projects/${editingProjectId}`, payload);
      showMessage('Project updated.');
    } else {
      await api.post('/api/projects', payload);
      showMessage('Project created.');
    }
    setProjectForm(emptyProject);
    setEditingProjectId(null);
    loadProjects();
  };

  const editProject = (p) => {
    setEditingProjectId(p._id);
    setProjectForm({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl || '',
      repoUrl: p.repoUrl || '',
      liveUrl: p.liveUrl || '',
      category: p.category || 'Full-Stack',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
    });
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await api.delete(`/api/projects/${id}`);
    showMessage('Project deleted.');
    loadProjects();
  };

  // ---- Blog post handlers ----
  const submitPost = async (e) => {
    e.preventDefault();
    if (editingPostId) {
      await api.put(`/api/blog/${editingPostId}`, postForm);
      showMessage('Blog post updated.');
    } else {
      await api.post('/api/blog', postForm);
      showMessage('Blog post created.');
    }
    setPostForm(emptyPost);
    setEditingPostId(null);
    loadPosts();
  };

  const editPost = (p) => {
    setEditingPostId(p._id);
    setPostForm({ title: p.title, content: p.content });
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await api.delete(`/api/blog/${id}`);
    showMessage('Blog post deleted.');
    loadPosts();
  };

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <p className="meta">Logged in as {user?.username}</p>
      {message && <p className="status success">{message}</p>}

      <div className="tabs">
        <button
          className={`tab ${tab === 'projects' ? 'active' : ''}`}
          onClick={() => setTab('projects')}
        >
          Manage Projects
        </button>
        <button className={`tab ${tab === 'blog' ? 'active' : ''}`} onClick={() => setTab('blog')}>
          Manage Blog
        </button>
      </div>

      {loading ? (
        <p className="status">Loading...</p>
      ) : tab === 'projects' ? (
        <div className="admin-grid">
          <form onSubmit={submitProject} className="form">
            <h3>{editingProjectId ? 'Edit Project' : 'Add Project'}</h3>
            <input
              placeholder="Title"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              rows="4"
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              required
            />
            <input
              placeholder="Image URL (optional)"
              value={projectForm.imageUrl}
              onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
            />
            <input
              placeholder="Repo URL (optional)"
              value={projectForm.repoUrl}
              onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
            />
            <input
              placeholder="Live URL (optional)"
              value={projectForm.liveUrl}
              onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
            />
            <select
              value={projectForm.category}
              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              placeholder="Tags, comma separated (e.g. React, Node.js)"
              value={projectForm.tags}
              onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
            />
            <button type="submit" className="btn">
              {editingProjectId ? 'Update Project' : 'Create Project'}
            </button>
            {editingProjectId && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setEditingProjectId(null);
                  setProjectForm(emptyProject);
                }}
              >
                Cancel
              </button>
            )}
          </form>

          <div className="admin-list">
            <h3>Projects ({projects.length})</h3>
            {projects.map((p) => (
              <div key={p._id} className="admin-item">
                <div>
                  <strong>{p.title}</strong>
                </div>
                <div className="admin-actions">
                  <button className="btn btn-small" onClick={() => editProject(p)}>
                    Edit
                  </button>
                  <button className="btn btn-small btn-danger" onClick={() => deleteProject(p._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="admin-grid">
          <form onSubmit={submitPost} className="form">
            <h3>{editingPostId ? 'Edit Blog Post' : 'Add Blog Post'}</h3>
            <input
              placeholder="Title"
              value={postForm.title}
              onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Content"
              rows="8"
              value={postForm.content}
              onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
              required
            />
            <button type="submit" className="btn">
              {editingPostId ? 'Update Post' : 'Create Post'}
            </button>
            {editingPostId && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setEditingPostId(null);
                  setPostForm(emptyPost);
                }}
              >
                Cancel
              </button>
            )}
          </form>

          <div className="admin-list">
            <h3>Blog Posts ({posts.length})</h3>
            {posts.map((p) => (
              <div key={p._id} className="admin-item">
                <div>
                  <strong>{p.title}</strong>
                  <p className="meta">{p.author?.username}</p>
                </div>
                <div className="admin-actions">
                  <button className="btn btn-small" onClick={() => editPost(p)}>
                    Edit
                  </button>
                  <button className="btn btn-small btn-danger" onClick={() => deletePost(p._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

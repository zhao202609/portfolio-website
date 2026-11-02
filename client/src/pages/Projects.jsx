import { useState, useEffect, useMemo } from 'react';
import api from '../api.js';
import ProjectCard from '../components/ProjectCard.jsx';

const filters = ['All', 'HTML/CSS', 'JavaScript', 'React', 'Full-Stack', 'Data'];

// Projects showcase: fetches GET /api/projects with category filtering.
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/projects');
        setProjects(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  return (
    <section>
      <div className="page-head">
        <h1>Projects</h1>
        <p>A focused collection of the labs and apps I built while learning full-stack development.</p>
      </div>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? 'on' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        filtered.length === 0 ? (
          <p className="status">No projects in this category yet.</p>
        ) : (
          <div className="p-grid">
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )
      )}
    </section>
  );
}

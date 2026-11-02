// Minimal, editorial-style card for a single portfolio project.
// Large areas are plain white; only a thin top rule uses a gradient.
export default function ProjectCard({ project, index = 0 }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <article className="p-card">
      <div className="p-card-meta">
        <span className="p-card-cat">{project.category || 'Project'}</span>
        <span className="p-card-num">{num}</span>
      </div>
      <span className="p-card-rule" />

      <div className="p-card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {project.tags?.length > 0 && (
          <ul className="p-tags">
            {project.tags.map((t) => (
              <li key={t} className="p-tag">
                {t}
              </li>
            ))}
          </ul>
        )}

        {(project.repoUrl || project.liveUrl) && (
          <div className="p-links">
            {project.repoUrl && (
              <a className="p-link" href={project.repoUrl} target="_blank" rel="noreferrer">
                Code →
              </a>
            )}
            {project.liveUrl && (
              <a className="p-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

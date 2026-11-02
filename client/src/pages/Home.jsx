import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import NetworkNode from '../components/NetworkNode.jsx';
import HeroBackdrop from '../components/HeroBackdrop.jsx';
import Reveal from '../components/Reveal.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

// Home / About Me page — "The Data Network" theme.

const stats = [
  { num: '8', label: 'Projects' },
  { num: '20', label: 'Hands-on Labs' },
  { num: 'MERN', label: 'Core Stack' },
];

const path = [
  { step: '01', title: 'HTML & CSS', note: 'Structure and responsive layout' },
  { step: '02', title: 'JavaScript', note: 'The DOM and interactivity' },
  { step: '03', title: 'React', note: 'Components and a single-page app' },
  { step: '04', title: 'Node & Express', note: 'REST APIs on the server' },
  { step: '05', title: 'MongoDB', note: 'Data modelling with Mongoose' },
];

const focus = [
  { key: '01', title: 'Front-End', keywords: ['React', 'JavaScript', 'HTML5', 'CSS / Flexbox'] },
  { key: '02', title: 'Back-End', keywords: ['Node.js', 'Express', 'MongoDB', 'JWT'] },
  {
    key: '03',
    title: 'Data & Database',
    keywords: ['Database Design', 'SQL', 'Mongoose', 'Data Modelling'],
  },
];

const coursework = [
  'Web Data Management',
  'Data Analysis Models',
  'Web Database Management',
  'Database Principles',
  'Introduction to Data Analysis',
  'Discrete Mathematics',
];

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get('/api/projects')
      .then((res) => setProjects(res.data.slice(0, 3)))
      .catch(() => setProjects([]));
  }, []);

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero hero-split">
        <HeroBackdrop />
        <div className="hero-split-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="rule" />
              Zhao Huijie · Web Data Management Capstone
            </p>

            <h1 className="display-title">
              Where <em>Data Management</em>
              <br />
              meets the Web
            </h1>

            <p className="lede">
              A student building data-driven web applications — from databases and REST APIs
              to a React interface.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="btn btn-solid">
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Contact
              </Link>
            </div>
          </div>

          <NetworkNode />
        </div>
      </section>

      {/* ===== Stats ===== */}
      <Reveal className="stats-row">
        {stats.map((s) => (
          <div key={s.label} className="stat-block">
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </Reveal>

      {/* ===== Learning path ===== */}
      <section className="section band band-green decor-dots">
        <Reveal>
          <h2 className="headline">My Learning Path</h2>
          <div className="rule-center" />
        </Reveal>
        <Reveal>
          <ol className="path">
            {path.map((p) => (
              <li key={p.step} className="path-item">
                <span className="path-dot" />
                <span className="path-step">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.note}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ===== Featured projects ===== */}
      <section className="section">
        <Reveal>
          <h2 className="headline">Featured Projects</h2>
          <div className="rule-center" />
        </Reveal>
        {projects.length > 0 ? (
          <div className="p-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="status">Start the back-end to see featured projects.</p>
        )}
        <p className="center">
          <Link to="/projects" className="btn btn-ghost">
            See all projects
          </Link>
        </p>
      </section>

      {/* ===== What I do ===== */}
      <section className="section">
        <Reveal>
          <h2 className="headline">What I do</h2>
          <div className="rule-center" />
        </Reveal>
        <Reveal>
          <div className="focus-cols decor-dots">
            {focus.map((f) => (
              <div key={f.key} className="focus-col">
                <span className="focus-key">{f.key}</span>
                <h3>{f.title}</h3>
                <ul>
                  {f.keywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Coursework ===== */}
      <section className="section band band-warm decor-grid">
        <Reveal>
          <h2 className="headline">Coursework</h2>
          <div className="rule-center" />
        </Reveal>
        <Reveal>
          <div className="chip-row">
            {coursework.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

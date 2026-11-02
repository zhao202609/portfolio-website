// Full-width, low-opacity "data network" backdrop for the hero.
// Pure decoration: faint nodes and thin lines behind the content.
const pts = [
  [60, 80], [180, 40], [320, 120], [470, 60], [600, 150],
  [740, 70], [880, 130], [1020, 50], [1160, 110], [1300, 70],
  [120, 260], [420, 300], [700, 250], [980, 300], [1240, 260],
];

// connect each point to the next two to form a loose mesh
const links = [];
for (let i = 0; i < pts.length; i++) {
  if (i + 1 < pts.length) links.push([pts[i], pts[i + 1]]);
  if (i + 3 < pts.length && i % 2 === 0) links.push([pts[i], pts[i + 3]]);
}

export default function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1360 360" preserveAspectRatio="xMidYMid slice" className="hero-backdrop-svg">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
            stroke="#6f8d77" strokeWidth="1" opacity="0.22"
          />
        ))}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i % 4 === 0 ? 4 : 2.6} fill="#3f9d8d" opacity="0.3" />
        ))}
      </svg>
    </div>
  );
}

// Themed "data network" illustration — larger and clearer.
// The photo is the central node, connected by fine lines to the
// technologies this course connects. Thin strokes only.
const nodes = [
  { x: 78, y: 104, label: 'Database', delay: 0 },
  { x: 382, y: 104, label: 'REST API', delay: 1.2 },
  { x: 96, y: 356, label: 'Node.js', delay: 2.1 },
  { x: 364, y: 356, label: 'React', delay: 0.7 },
];

export default function NetworkNode() {
  return (
    <div className="network" aria-hidden="true">
      <svg viewBox="0 0 460 460" role="img" className="network-svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6f8d77" />
            <stop offset="50%" stopColor="#3f9d8d" />
            <stop offset="100%" stopColor="#bf875a" />
          </linearGradient>
          <clipPath id="photoClip">
            <circle cx="230" cy="230" r="96" />
          </clipPath>
        </defs>

        {/* slow rotating orbit rings */}
        <g className="network-orbit">
          <circle cx="230" cy="230" r="178" fill="none" stroke="#d7ded6" strokeWidth="1" strokeDasharray="2 8" />
        </g>
        <circle cx="230" cy="230" r="146" fill="none" stroke="#e6e9e2" strokeWidth="1" />

        {/* connection lines */}
        {nodes.map((n) => (
          <line
            key={n.label}
            x1="230"
            y1="230"
            x2={n.x}
            y2={n.y}
            stroke="url(#lineGrad)"
            strokeWidth="1.4"
            className="network-link"
          />
        ))}

        {/* outer nodes */}
        {nodes.map((n) => (
          <g key={n.label} className="network-node" style={{ animationDelay: `${n.delay}s` }}>
            <circle cx={n.x} cy={n.y} r="11" fill="#ffffff" stroke="#6f8d77" strokeWidth="1.6" />
            <circle cx={n.x} cy={n.y} r="4" fill="#bf875a" />
            <text
              x={n.x}
              y={n.y < 230 ? n.y - 24 : n.y + 40}
              textAnchor="middle"
              className="network-label"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* central photo */}
        <circle cx="230" cy="230" r="106" fill="#ffffff" stroke="url(#lineGrad)" strokeWidth="1.8" />
        <image
          href="/profile.jpg"
          x="134"
          y="134"
          width="192"
          height="192"
          clipPath="url(#photoClip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}

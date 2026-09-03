/**
 * Chapter 05 — "The World"
 * A lit home niche that, as the camera pulls back, becomes a single glowing
 * point on the curve of the earth, joined by destinations across the globe.
 * 2000×2000 space; room at ~(1000,820), earth centred low at (1000,2600).
 *
 *   .w-stars  — sparse night field
 *   .w-earth  — planet arc + abstract landmasses
 *   .w-points — destination glows + travel arcs
 *   .w-room   — the home niche + diya (the origin)
 *
 * `idPrefix` keeps gradient IDs unique across the desktop + mobile instances.
 */
const STARS = [
  [220, 360], [420, 240], [700, 300], [980, 200], [1280, 260], [1560, 360],
  [1760, 520], [300, 620], [1700, 720], [150, 900], [1850, 980], [560, 180],
] as const;

const POINTS = [
  { x: 1000, y: 786, r: 10, o: 1 }, // origin — India
  { x: 720, y: 900, r: 6, o: 0.7 },
  { x: 1300, y: 872, r: 6, o: 0.7 },
  { x: 540, y: 1040, r: 5, o: 0.55 },
  { x: 1520, y: 1020, r: 5, o: 0.55 },
  { x: 900, y: 1120, r: 5, o: 0.5 },
] as const;

export function WorldArt({
  idPrefix = "w",
  revealed = false,
}: {
  idPrefix?: string;
  /** Static view (mobile): show the stars/earth/points instead of only the home. */
  revealed?: boolean;
}) {
  const p = idPrefix;
  const shown = revealed ? 1 : 0;
  return (
    <>
      <defs>
        <radialGradient id={`${p}-sky`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#241d2e" />
          <stop offset="60%" stopColor="#181521" />
          <stop offset="100%" stopColor="#0e0c14" />
        </radialGradient>
        <radialGradient id={`${p}-globe`} cx="42%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#3a3350" />
          <stop offset="55%" stopColor="#241f36" />
          <stop offset="100%" stopColor="#12101c" />
        </radialGradient>
        <radialGradient id={`${p}-atmo`} cx="50%" cy="50%" r="50%">
          <stop offset="88%" stopColor="#8fb4ff" stopOpacity="0" />
          <stop offset="100%" stopColor="#8fb4ff" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id={`${p}-diyaglow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffcf7a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffcf7a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="2000" height="2000" fill={`url(#${p}-sky)`} />

      <g className="w-stars" fill="#fff" opacity={shown}>
        {STARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.6} opacity={0.5 + (i % 3) * 0.15} />
        ))}
      </g>

      {/* Earth */}
      <g className="w-earth" opacity={shown}>
        <circle cx="1000" cy="2600" r="1860" fill={`url(#${p}-atmo)`} />
        <circle cx="1000" cy="2600" r="1800" fill={`url(#${p}-globe)`} />
        {/* abstract landmasses */}
        <g fill="#4a6b4e" fillOpacity="0.55">
          <path d="M760 900 C 900 840 1080 860 1160 930 C 1120 1010 980 1040 880 1010 C 800 986 740 950 760 900 Z" />
          <path d="M520 1080 C 620 1040 700 1070 720 1140 C 640 1180 540 1160 520 1080 Z" />
          <path d="M1300 980 C 1420 950 1520 1000 1520 1080 C 1420 1110 1320 1080 1300 980 Z" />
        </g>
      </g>

      {/* Destinations + travel arcs */}
      <g className="w-points" opacity={shown}>
        <g fill="none" stroke="#ffcf7a" strokeOpacity="0.4" strokeWidth="2.5">
          <path d="M1000 786 Q 860 660 720 900" />
          <path d="M1000 786 Q 1160 640 1300 872" />
          <path d="M1000 786 Q 720 720 540 1040" />
          <path d="M1000 786 Q 1300 700 1520 1020" />
        </g>
        {POINTS.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={pt.r * 3} fill={`url(#${p}-diyaglow)`} opacity={pt.o * 0.6} />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill="#ffe0a0" opacity={pt.o} />
          </g>
        ))}
      </g>

      {/* Home niche (origin) */}
      <g className="w-room">
        <circle cx="1000" cy="812" r="120" fill={`url(#${p}-diyaglow)`} />
        {/* mandir arch */}
        <path
          d="M936 858 L936 812 Q936 752 1000 752 Q1064 752 1064 812 L1064 858 Z"
          fill="#2a1f1a"
          stroke="#b08d57"
          strokeWidth="4"
        />
        {/* tiny diya */}
        <path d="M974 842 Q1000 856 1026 842 L1020 856 Q1000 864 980 856 Z" fill="#c79a4e" />
        <path d="M1000 838 Q994 820 1000 806 Q1006 820 1000 838 Z" fill="#ffb347" />
        <ellipse cx="1000" cy="826" rx="3.4" ry="8" fill="#fff7e0" />
      </g>
    </>
  );
}

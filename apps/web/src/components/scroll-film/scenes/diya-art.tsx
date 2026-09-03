/**
 * Chapter 01 — "The Light"
 * A brass oil-lamp (diya) with a layered flame, drawn in a 1600×1600 space,
 * centred around the flame at ~(800, 660). Designed for a viewBox dolly-in:
 * the camera travels from a wide frame toward the flame until it fills the view.
 *
 * Group hooks (scoped by the scene):
 *   .diya-glow   — soft radial halo behind the flame
 *   .diya-flame  — the whole flame cluster
 *   .diya-body   — the brass lamp
 *   .diya-ember  — drifting embers
 *
 * `idPrefix` keeps gradient IDs unique so the desktop and mobile instances
 * (both live in the DOM) never cross-reference each other's paint servers.
 */
export function DiyaArt({ idPrefix = "d" }: { idPrefix?: string }) {
  const p = idPrefix;
  return (
    <>
      <defs>
        <radialGradient id={`${p}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffcf7a" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#e79a3c" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e79a3c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-flame-outer`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#c8551f" />
          <stop offset="45%" stopColor="#f08a2a" />
          <stop offset="100%" stopColor="#ffd36b" />
        </linearGradient>
        <linearGradient id={`${p}-flame-inner`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="70%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#fff7e0" />
        </linearGradient>
        <linearGradient id={`${p}-brass`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d79a" />
          <stop offset="42%" stopColor="#c79a4e" />
          <stop offset="100%" stopColor="#7c5a24" />
        </linearGradient>
        <linearGradient id={`${p}-brass-rim`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a6a2e" />
          <stop offset="50%" stopColor="#f4e3ac" />
          <stop offset="100%" stopColor="#8a6a2e" />
        </linearGradient>
      </defs>

      {/* Soft halo */}
      <g className="diya-glow">
        <circle cx="800" cy="640" r="520" fill={`url(#${p}-glow)`} />
      </g>

      {/* Drifting embers (calm, sparse) */}
      <g className="diya-ember" fill="#ffcf7a">
        <circle cx="720" cy="500" r="3.5" opacity="0.7" />
        <circle cx="880" cy="440" r="2.5" opacity="0.55" />
        <circle cx="840" cy="560" r="2" opacity="0.6" />
        <circle cx="760" cy="600" r="2.5" opacity="0.4" />
      </g>

      {/* Flame cluster */}
      <g className="diya-flame">
        <path
          className="diya-flame-outer"
          d="M800 900
             C 704 812 690 700 742 600
             C 772 542 762 486 800 420
             C 838 486 828 542 858 600
             C 910 700 896 812 800 900 Z"
          fill={`url(#${p}-flame-outer)`}
        />
        <path
          className="diya-flame-inner"
          d="M800 872
             C 748 812 742 720 778 640
             C 800 592 792 548 800 500
             C 808 548 800 592 822 640
             C 858 720 852 812 800 872 Z"
          fill={`url(#${p}-flame-inner)`}
        />
        <ellipse cx="800" cy="792" rx="26" ry="54" fill="#fff7e0" opacity="0.95" />
      </g>

      {/* Brass lamp */}
      <g className="diya-body">
        {/* cast shadow */}
        <ellipse cx="800" cy="1024" rx="260" ry="34" fill="#000" opacity="0.28" />
        {/* wick */}
        <rect x="794" y="884" width="12" height="34" rx="4" fill="#3a2921" />
        {/* oil pool */}
        <ellipse cx="800" cy="912" rx="176" ry="34" fill="#d8b26a" opacity="0.9" />
        {/* bowl */}
        <path
          d="M612 906
             C 640 992 720 1030 800 1030
             C 880 1030 960 992 988 906
             C 946 936 862 950 800 950
             C 738 950 654 936 612 906 Z"
          fill={`url(#${p}-brass)`}
        />
        {/* rim highlight */}
        <ellipse
          cx="800"
          cy="906"
          rx="188"
          ry="40"
          fill="none"
          stroke={`url(#${p}-brass-rim)`}
          strokeWidth="10"
        />
        {/* foot */}
        <path
          d="M726 1030 L744 1074 L856 1074 L874 1030 Z"
          fill={`url(#${p}-brass)`}
        />
        <ellipse cx="800" cy="1074" rx="72" ry="14" fill={`url(#${p}-brass-rim)`} />
      </g>
    </>
  );
}

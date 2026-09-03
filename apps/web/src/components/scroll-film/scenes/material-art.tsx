/**
 * Chapter 03 — "The Craft"
 * A macro brass surface (2000×1200) centred at (1000,600). The camera travels
 * INTO the engraving, a copper vein bleeds in (colour transition), then the
 * camera pulls back to resolve the turned rings into a finished vessel on a
 * lathe.
 *
 *   .mat-surface — brass field + engraved turning rings
 *   .mat-copper  — copper colour transition (revealed mid-scene)
 *   .mat-spec    — specular highlight sweep
 *   .mat-wheel   — faint lathe spokes (revealed on pull-back)
 *   .mat-vessel  — finished object silhouette (revealed on pull-back)
 *
 * `idPrefix` keeps gradient IDs unique across the desktop + mobile instances.
 */
const RINGS = Array.from({ length: 16 }, (_, i) => 120 + i * 52);

export function MaterialArt({
  idPrefix = "m",
  revealed = false,
}: {
  idPrefix?: string;
  /** Static view (mobile): show the finished vessel + lathe instead of bare rings. */
  revealed?: boolean;
}) {
  const p = idPrefix;
  return (
    <>
      <defs>
        <linearGradient id={`${p}-brass`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9cd8e" />
          <stop offset="40%" stopColor="#bd9146" />
          <stop offset="72%" stopColor="#8a6529" />
          <stop offset="100%" stopColor="#5c3f18" />
        </linearGradient>
        <linearGradient id={`${p}-copper`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0a074" />
          <stop offset="50%" stopColor="#b06a3c" />
          <stop offset="100%" stopColor="#6f3c1e" />
        </linearGradient>
        <linearGradient id={`${p}-spec`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff7e0" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff7e0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff7e0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${p}-vessel`} cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#f0d79a" />
          <stop offset="55%" stopColor="#bd9146" />
          <stop offset="100%" stopColor="#6b4a1e" />
        </radialGradient>
      </defs>

      {/* Brass field + engraved turning rings */}
      <g className="mat-surface">
        <rect x="0" y="0" width="2000" height="1200" fill={`url(#${p}-brass)`} />
        <g fill="none" stroke="#3a2712" strokeOpacity="0.35">
          {RINGS.map((r, i) => (
            <ellipse
              key={r}
              cx="1000"
              cy="600"
              rx={r}
              ry={r * 0.62}
              strokeWidth={i % 2 === 0 ? 3 : 1.5}
            />
          ))}
        </g>
        <g fill="none" stroke="#fbe7bb" strokeOpacity="0.28">
          {RINGS.map((r) => (
            <ellipse key={`h-${r}`} cx="1000" cy={598} rx={r} ry={r * 0.62} strokeWidth="1" />
          ))}
        </g>
      </g>

      {/* Copper colour transition (right side) */}
      <rect className="mat-copper" x="1200" y="0" width="800" height="1200" fill={`url(#${p}-copper)`} opacity="0" />

      {/* Specular sweep */}
      <polygon className="mat-spec" points="-300,0 200,0 700,1200 200,1200" fill={`url(#${p}-spec)`} opacity="0.5" />

      {/* Lathe spokes — revealed on pull-back */}
      <g className="mat-wheel" stroke="#fbe7bb" strokeOpacity="0.18" strokeWidth="2" opacity={revealed ? 1 : 0}>
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <line
              key={i}
              x1="1000"
              y1="600"
              x2={1000 + Math.cos(a) * 900}
              y2={600 + Math.sin(a) * 560}
            />
          );
        })}
      </g>

      {/* Finished vessel — revealed on pull-back */}
      <g className="mat-vessel" opacity={revealed ? 1 : 0}>
        <ellipse cx="1000" cy="946" rx="150" ry="30" fill="#000" opacity="0.3" />
        <path
          d="M876 940
             C 852 860 856 792 900 750
             C 856 720 852 660 900 632
             C 940 610 1060 610 1100 632
             C 1148 660 1144 720 1100 750
             C 1144 792 1148 860 1124 940 Z"
          fill={`url(#${p}-vessel)`}
        />
        <ellipse cx="1000" cy="632" rx="100" ry="26" fill="#f4e3ac" opacity="0.85" />
        <ellipse cx="1000" cy="632" rx="100" ry="26" fill="none" stroke="#7c5a24" strokeWidth="4" />
      </g>
    </>
  );
}

/**
 * Chapter 02 — "The Ritual"
 * A brass puja thali with ritual objects, 1600×1000 space, plate at ~(800,650).
 * Each object is an addressable group so the scene can assemble them on scroll.
 *
 *   .ro-thali    — the plate (base of the composition)
 *   .ro-diya     — oil lamp
 *   .ro-bell     — hand bell
 *   .ro-incense  — incense stand + sticks
 *   .ro-flowers  — marigold blooms
 *
 * `idPrefix` keeps gradient IDs unique across the desktop + mobile instances.
 */
export function RitualArt({ idPrefix = "r" }: { idPrefix?: string }) {
  const p = idPrefix;
  return (
    <>
      <defs>
        <radialGradient id={`${p}-spot`} cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#3a2c22" />
          <stop offset="100%" stopColor="#1c1a17" />
        </radialGradient>
        <linearGradient id={`${p}-brass`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d79a" />
          <stop offset="45%" stopColor="#c79a4e" />
          <stop offset="100%" stopColor="#7c5a24" />
        </linearGradient>
        <linearGradient id={`${p}-rim`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a6a2e" />
          <stop offset="50%" stopColor="#f4e3ac" />
          <stop offset="100%" stopColor="#8a6a2e" />
        </linearGradient>
        <radialGradient id={`${p}-marigold`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd36b" />
          <stop offset="100%" stopColor="#e08a1e" />
        </radialGradient>
      </defs>

      {/* Ground vignette */}
      <rect x="-200" y="-200" width="2000" height="1400" fill={`url(#${p}-spot)`} />

      {/* Thali plate */}
      <g className="ro-thali">
        <ellipse cx="800" cy="770" rx="420" ry="70" fill="#000" opacity="0.32" />
        <ellipse cx="800" cy="650" rx="392" ry="132" fill={`url(#${p}-brass)`} />
        <ellipse
          cx="800"
          cy="650"
          rx="392"
          ry="132"
          fill="none"
          stroke={`url(#${p}-rim)`}
          strokeWidth="12"
        />
        <ellipse cx="800" cy="644" rx="300" ry="98" fill="#b78f45" opacity="0.55" />
        <ellipse cx="800" cy="642" rx="236" ry="76" fill="none" stroke="#f4e3ac" strokeWidth="3" opacity="0.5" />
        <ellipse cx="800" cy="640" rx="168" ry="54" fill="none" stroke="#f4e3ac" strokeWidth="2" opacity="0.4" />
      </g>

      {/* Incense stand (back) */}
      <g className="ro-incense">
        <rect x="676" y="486" width="120" height="18" rx="8" fill={`url(#${p}-brass)`} />
        <g stroke="#5a3d22" strokeWidth="4" strokeLinecap="round">
          <line x1="700" y1="486" x2="686" y2="350" />
          <line x1="736" y1="486" x2="736" y2="336" />
          <line x1="772" y1="486" x2="786" y2="352" />
        </g>
        <circle cx="686" cy="350" r="6" fill="#ff8a3c" />
        <circle cx="736" cy="336" r="6" fill="#ffb347" />
        <circle cx="786" cy="352" r="6" fill="#ff8a3c" />
      </g>

      {/* Bell (right) */}
      <g className="ro-bell">
        <path d="M956 560 Q956 470 1004 470 Q1052 470 1052 560 Z" fill={`url(#${p}-brass)`} />
        <ellipse cx="1004" cy="560" rx="48" ry="12" fill={`url(#${p}-rim)`} />
        <rect x="998" y="420" width="12" height="52" rx="6" fill={`url(#${p}-brass)`} />
        <circle cx="1004" cy="414" r="14" fill={`url(#${p}-rim)`} />
      </g>

      {/* Diya (left) */}
      <g className="ro-diya">
        <path
          d="M560 596 C 576 632 604 648 640 648 C 676 648 704 632 720 596 C 700 610 660 616 640 616 C 620 616 580 610 560 596 Z"
          fill={`url(#${p}-brass)`}
        />
        <ellipse cx="640" cy="596" rx="80" ry="16" fill={`url(#${p}-rim)`} />
        <path d="M640 592 C 618 560 622 520 640 486 C 658 520 662 560 640 592 Z" fill="#ffb347" />
        <ellipse cx="640" cy="556" rx="8" ry="20" fill="#fff7e0" />
      </g>

      {/* Marigold blooms (front) */}
      <g className="ro-flowers" fill={`url(#${p}-marigold)`}>
        <g>
          <circle cx="760" cy="726" r="26" />
          <circle cx="742" cy="712" r="14" />
          <circle cx="780" cy="712" r="14" />
          <circle cx="760" cy="742" r="14" />
        </g>
        <g>
          <circle cx="900" cy="736" r="22" />
          <circle cx="884" cy="724" r="12" />
          <circle cx="916" cy="724" r="12" />
        </g>
        <g>
          <circle cx="678" cy="710" r="18" />
          <circle cx="664" cy="700" r="10" />
          <circle cx="692" cy="700" r="10" />
        </g>
      </g>
    </>
  );
}

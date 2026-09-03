import type { ReactElement } from "react";

/**
 * Large single-object vectors for Chapter 04's horizontal "worlds".
 * 800×800 space, object centred. Spotlit on dark ground.
 *
 * Each instance receives a unique `idPrefix` so the many copies that live in
 * the DOM at once (desktop track + mobile list) never share gradient IDs —
 * a shared ID resolves to the first (often hidden) instance and breaks fills.
 */
type ObjectKey = "diya" | "thali" | "bell" | "incense" | "kit";

function Defs({ p }: { p: string }) {
  return (
    <defs>
      <radialGradient id={`${p}-spot`} cx="50%" cy="46%" r="52%">
        <stop offset="0%" stopColor="#3a2c22" />
        <stop offset="100%" stopColor="#1c1a17" stopOpacity="0" />
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
    </defs>
  );
}

function Diya({ p }: { p: string }) {
  return (
    <g>
      <ellipse cx="400" cy="560" rx="180" ry="34" fill="#000" opacity="0.28" />
      <path d="M250 470 C 280 540 340 566 400 566 C 460 566 520 540 550 470 C 512 494 448 502 400 502 C 352 502 288 494 250 470 Z" fill={`url(#${p}-brass)`} />
      <ellipse cx="400" cy="470" rx="150" ry="30" fill={`url(#${p}-rim)`} />
      <path d="M400 466 C 356 400 364 320 400 250 C 436 320 444 400 400 466 Z" fill="#ffb347" />
      <ellipse cx="400" cy="390" rx="14" ry="40" fill="#fff7e0" />
    </g>
  );
}

function Thali({ p }: { p: string }) {
  return (
    <g>
      <ellipse cx="400" cy="520" rx="300" ry="52" fill="#000" opacity="0.28" />
      <ellipse cx="400" cy="440" rx="300" ry="104" fill={`url(#${p}-brass)`} />
      <ellipse cx="400" cy="440" rx="300" ry="104" fill="none" stroke={`url(#${p}-rim)`} strokeWidth="10" />
      <ellipse cx="400" cy="436" rx="220" ry="74" fill="#b78f45" opacity="0.5" />
      <ellipse cx="400" cy="434" rx="150" ry="50" fill="none" stroke="#f4e3ac" strokeWidth="2.5" opacity="0.5" />
    </g>
  );
}

function Bell({ p }: { p: string }) {
  return (
    <g>
      <ellipse cx="400" cy="600" rx="120" ry="26" fill="#000" opacity="0.26" />
      <path d="M300 560 Q300 360 400 360 Q500 360 500 560 Z" fill={`url(#${p}-brass)`} />
      <ellipse cx="400" cy="560" rx="100" ry="24" fill={`url(#${p}-rim)`} />
      <rect x="388" y="250" width="24" height="112" rx="12" fill={`url(#${p}-brass)`} />
      <circle cx="400" cy="240" r="30" fill={`url(#${p}-rim)`} />
    </g>
  );
}

function Incense({ p }: { p: string }) {
  return (
    <g>
      <ellipse cx="400" cy="580" rx="160" ry="30" fill="#000" opacity="0.26" />
      <rect x="300" y="540" width="200" height="30" rx="14" fill={`url(#${p}-brass)`} />
      <g stroke="#5a3d22" strokeWidth="7" strokeLinecap="round">
        <line x1="340" y1="540" x2="316" y2="220" />
        <line x1="400" y1="540" x2="400" y2="190" />
        <line x1="460" y1="540" x2="484" y2="224" />
      </g>
      <circle cx="316" cy="220" r="10" fill="#ff8a3c" />
      <circle cx="400" cy="190" r="10" fill="#ffb347" />
      <circle cx="484" cy="224" r="10" fill="#ff8a3c" />
    </g>
  );
}

function Kit({ p }: { p: string }) {
  return (
    <g>
      <ellipse cx="400" cy="600" rx="230" ry="42" fill="#000" opacity="0.26" />
      {/* basket */}
      <path d="M230 430 L570 430 L536 600 L264 600 Z" fill={`url(#${p}-brass)`} />
      <ellipse cx="400" cy="430" rx="170" ry="46" fill="#b78f45" />
      <ellipse cx="400" cy="430" rx="170" ry="46" fill="none" stroke={`url(#${p}-rim)`} strokeWidth="8" />
      {/* contents */}
      <circle cx="342" cy="404" r="34" fill="#e08a1e" />
      <circle cx="410" cy="398" r="30" fill="#ffd36b" />
      <path d="M452 410 C 440 380 446 352 470 336 C 460 366 470 392 452 410 Z" fill="#ffb347" />
      <rect x="356" y="360" width="46" height="30" rx="6" fill="#a15c3a" />
    </g>
  );
}

const MAP: Record<ObjectKey, (props: { p: string }) => ReactElement> = {
  diya: Diya,
  thali: Thali,
  bell: Bell,
  incense: Incense,
  kit: Kit,
};

export function CategoryObject({ kind, idPrefix }: { kind: ObjectKey; idPrefix?: string }) {
  const p = idPrefix ?? `co-${kind}`;
  const Shape = MAP[kind];
  return (
    <svg viewBox="0 0 800 800" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <Defs p={p} />
      <ellipse cx="400" cy="400" rx="420" ry="420" fill={`url(#${p}-spot)`} />
      <Shape p={p} />
    </svg>
  );
}

export type { ObjectKey };

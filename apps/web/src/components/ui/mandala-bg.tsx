export function MandalaBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute text-gold/10 ${className}`}
      viewBox="0 0 200 200"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="100"
          x2={100 + 90 * Math.cos((deg * Math.PI) / 180)}
          y2={100 + 90 * Math.sin((deg * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <circle
          key={`p-${deg}`}
          cx={100 + 70 * Math.cos((deg * Math.PI) / 180)}
          cy={100 + 70 * Math.sin((deg * Math.PI) / 180)}
          r="3"
          opacity="0.4"
        />
      ))}
    </svg>
  );
}

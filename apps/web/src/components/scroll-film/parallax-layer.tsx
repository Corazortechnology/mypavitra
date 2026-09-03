import type { CSSProperties, ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /**
   * Depth hint 0..1 (0 = far background, 1 = near foreground). Sets stacking
   * and is exposed via data-depth so a scene's timeline can drive parallax
   * (nearer layers travel further / faster).
   */
  depth?: number;
  style?: CSSProperties;
}

/**
 * A full-bleed absolutely-positioned layer inside a cinematic stage.
 *
 * Purely presentational — the parent scene's timeline animates it via scoped
 * selectors / data-depth. Keeps transform work off scene ancestors so pinning
 * (position: fixed) is never broken.
 */
export function ParallaxLayer({
  children,
  className = "",
  depth = 0.5,
  style,
}: ParallaxLayerProps) {
  return (
    <div
      data-depth={depth}
      className={`absolute inset-0 flex items-center justify-center will-change-transform ${className}`}
      style={{ zIndex: Math.round(depth * 100), ...style }}
    >
      {children}
    </div>
  );
}

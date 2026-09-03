/**
 * MyPavitra motion language
 *
 * FAST   — micro interactions (hover, tap, focus)
 * MEDIUM — component transitions (drawer, modal, toast, route)
 * SLOW   — editorial / storytelling reveals
 *
 * Prefer transform + opacity. No springs. No bounce.
 */

export const ease = {
  /** Soft deceleration — primary for reveals */
  out: [0.22, 1, 0.36, 1] as const,
  /** Balanced in-out for UI chrome */
  inOut: [0.45, 0, 0.55, 1] as const,
  /** Slightly heavier for cinematic exits */
  cinematic: [0.16, 1, 0.3, 1] as const,
};

/** Duration in seconds (Framer / GSAP) */
export const duration = {
  fast: 0.18,
  medium: 0.32,
  slow: 0.7,
  cinematic: 1.1,
} as const;

/** CSS-ready values for Tailwind / globals */
export const durationMs = {
  fast: "180ms",
  medium: "320ms",
  slow: "700ms",
  cinematic: "1100ms",
} as const;

/** Standard Framer transition presets */
export const transition = {
  fast: { duration: duration.fast, ease: ease.inOut },
  medium: { duration: duration.medium, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.out },
  cinematic: { duration: duration.cinematic, ease: ease.cinematic },
} as const;

/** Viewport once — only for intentional editorial reveals */
export const revealViewport = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -12% 0px",
} as const;

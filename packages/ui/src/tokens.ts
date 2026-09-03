export const colors = {
  ivory: "#F6F1E8",
  sand: "#E9E0D2",
  ivoryDark: "#E9E0D2",
  charcoal: "#1C1A17",
  muted: "#6F685E",
  brass: "#B08D57",
  saffron: "#C87533",
  saffronLight: "#D4894A",
  saffronGlow: "#C87533",
  gold: "#B08D57",
  goldMuted: "#9A7A4C",
  goldLight: "#D4C0A0",
  brown: "#1C1A17",
  brownLight: "#3A2921",
  temple: "#3A2921",
  copper: "#A15C3A",
  maroon: "#3A2921",
  cream: "#F6F1E8",
  white: "#FFFFFF",
  gray100: "#F5F5F5",
  gray200: "#E8E8E8",
  gray500: "#6F685E",
  gray700: "#3A2921",
  success: "#2D6A4F",
  error: "#C1292E",
} as const;

export const fonts = {
  sans: '"DM Sans Variable", "DM Sans", system-ui, sans-serif',
  display: '"Instrument Serif", Georgia, serif',
  devanagari: "var(--font-noto-devanagari), 'Noto Sans Devanagari', sans-serif",
} as const;

export const spacing = {
  section: "6rem",
  sectionLg: "8rem",
  container: "1280px",
} as const;

export const motion = {
  duration: {
    fast: "180ms",
    base: "320ms",
    slow: "700ms",
    cinematic: "1100ms",
  },
  ease: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export const radii = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
} as const;

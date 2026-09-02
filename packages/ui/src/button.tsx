import type { ReactNode, ButtonHTMLAttributes } from "react";
import { colors } from "./tokens";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: {
    backgroundColor: colors.saffron,
    color: colors.white,
    border: "none",
  },
  secondary: {
    backgroundColor: colors.brown,
    color: colors.white,
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.brown,
    border: `1.5px solid ${colors.brown}`,
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.brown,
    border: "none",
  },
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, React.CSSProperties> = {
  sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
  md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
  lg: { padding: "1rem 2rem", fontSize: "1.0625rem" },
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: "6px",
        fontWeight: 600,
        cursor: "pointer",
        width: fullWidth ? "100%" : undefined,
        transition: "opacity 0.15s ease",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

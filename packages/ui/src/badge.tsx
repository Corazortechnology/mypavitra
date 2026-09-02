import type { ReactNode } from "react";
import { colors } from "./tokens";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "savings" | "value" | "stock";
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, React.CSSProperties> = {
  default: { backgroundColor: colors.ivoryDark, color: colors.brown },
  savings: { backgroundColor: "#E8F5E9", color: colors.success },
  value: { backgroundColor: "#FFF3E0", color: colors.saffron },
  stock: { backgroundColor: colors.ivoryDark, color: colors.gray700 },
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      style={{
        ...badgeVariants[variant],
        display: "inline-block",
        padding: "0.25rem 0.625rem",
        borderRadius: "4px",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  );
}

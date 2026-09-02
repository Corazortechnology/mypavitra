import type { ReactNode } from "react";
import { TempleBackground } from "./temple-background";

interface TempleSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "hero" | "section" | "subtle" | "dark";
  id?: string;
}

export function TempleSection({
  children,
  className = "",
  variant = "section",
  id,
}: TempleSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${isDark ? "text-white" : ""} ${className}`}
    >
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brown via-maroon to-brown" />
          <div className="absolute inset-0 bg-spiritual-pattern opacity-15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(232,132,26,0.15),transparent)]" />
        </>
      ) : (
        <TempleBackground variant={variant === "subtle" ? "subtle" : variant === "hero" ? "hero" : "section"} />
      )}
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}

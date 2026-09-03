import type { ReactNode } from "react";

type Placement =
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "top-left"
  | "left"
  | "right";

interface ChapterCaptionProps {
  children: ReactNode;
  /** e.g. "01" — small editorial index. */
  index?: string;
  kicker?: string;
  placement?: Placement;
  className?: string;
  /** Class hook the scene timeline drives (opacity / y / clip). */
  captionClassName?: string;
  tone?: "light" | "dark";
  /**
   * Render visible at rest instead of opacity-0. Use for the FIRST caption of
   * a scene so the screen is never textless before GSAP runs / if JS is slow.
   * The timeline can still fade it out on scroll.
   */
  visibleByDefault?: boolean;
}

const PLACEMENT: Record<Placement, string> = {
  center: "inset-0 items-center justify-center text-center",
  "bottom-center": "inset-x-0 bottom-0 items-end justify-center pb-[12vh] text-center",
  "bottom-left": "inset-x-0 bottom-0 items-end justify-start pb-[12vh] text-left",
  "top-left": "inset-x-0 top-0 items-start justify-start pt-[16vh] text-left",
  left: "inset-y-0 left-0 items-center justify-start text-left",
  right: "inset-y-0 right-0 items-center justify-end text-right",
};

/**
 * Editorial storytelling caption for a cinematic scene. Presentational only:
 * initially hidden (opacity 0) so the scene timeline can reveal/hide it in sync
 * with scroll. Masked line reveal via the inner span + overflow-hidden.
 */
export function ChapterCaption({
  children,
  index,
  kicker,
  placement = "bottom-center",
  className = "",
  captionClassName = "film-caption",
  tone = "light",
  visibleByDefault = false,
}: ChapterCaptionProps) {
  const color = tone === "light" ? "text-ivory" : "text-brown";
  const sub = tone === "light" ? "text-gold-light/80" : "text-brass";

  return (
    <div
      className={`pointer-events-none absolute z-[60] flex px-6 sm:px-10 ${PLACEMENT[placement]} ${className}`}
    >
      <div className={`${captionClassName} max-w-2xl ${visibleByDefault ? "opacity-100" : "opacity-0"}`}>
        {(index || kicker) && (
          <p
            className={`mb-3 flex items-center gap-3 text-[0.6rem] font-medium uppercase tracking-[0.4em] ${sub}`}
          >
            {index && <span className="tabular-nums">{index}</span>}
            {index && kicker && <span className="h-px w-8 bg-current opacity-50" />}
            {kicker}
          </p>
        )}
        <div
          className={`font-display text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl ${color}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

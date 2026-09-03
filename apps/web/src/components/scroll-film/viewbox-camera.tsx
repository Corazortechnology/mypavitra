import type { ReactNode } from "react";

interface ViewBoxCameraProps {
  children: ReactNode;
  /** Initial camera frame, e.g. "0 0 1000 1000". */
  viewBox: string;
  className?: string;
  /** Class hook the scene timeline animates (attr: { viewBox }). */
  cameraClassName?: string;
  ariaLabel?: string;
}

/**
 * SVG "camera": animating the viewBox is the vector-native equivalent of a
 * physical dolly/zoom — infinitely sharp at any depth, one animated attribute,
 * GPU-cheap. The scene timeline scrubs `attr: { viewBox }` on the element
 * matched by `cameraClassName` with ease "none" for true 1:1 scroll mapping.
 */
export function ViewBoxCamera({
  children,
  viewBox,
  className = "",
  cameraClassName = "film-camera",
  ariaLabel,
}: ViewBoxCameraProps) {
  return (
    <svg
      className={`${cameraClassName} h-full w-full ${className}`}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {children}
    </svg>
  );
}

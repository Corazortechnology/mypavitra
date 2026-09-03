import type { ReactNode } from "react";

/**
 * Route wrapper.
 *
 * NOTE: this intentionally does NOT animate opacity from 0. A Framer
 * `initial={{ opacity: 0 }}` wrapper here renders the ENTIRE page invisible in
 * the SSR HTML until hydration runs — on a heavy, GSAP-driven homepage that
 * reads as "empty content" on cold loads. Content must paint immediately;
 * the scroll-film supplies all the motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

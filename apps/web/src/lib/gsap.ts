"use client";

/**
 * Single GSAP entry point for the whole app.
 *
 * - Registers ScrollTrigger + useGSAP exactly once (guarded for SSR).
 * - Every scroll-film component imports gsap/ScrollTrigger/useGSAP from HERE,
 *   never from "gsap" directly, so plugin registration can never be missed
 *   and we never double-register.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Premium defaults: linear scrubbing (easing comes from scroll velocity),
  // and ignore the mobile browser-chrome resize so pins don't jump.
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: "none" });
}

export { gsap, ScrollTrigger, useGSAP };

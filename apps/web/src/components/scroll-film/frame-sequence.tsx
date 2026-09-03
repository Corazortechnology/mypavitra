"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface FrameSequenceProps {
  /** Returns the URL for frame `i` (0-based). e.g. (i)=>`/seq/diya/${i}.webp` */
  frameUrl: (index: number) => string;
  frameCount: number;
  /** Intrinsic frame size for crisp DPR-aware drawing. */
  width: number;
  height: number;
  /** Scroll distance the scrub spans while pinned. */
  scroll?: string;
  className?: string;
  /** Poster shown for reduced-motion / while loading (defaults to frame 0). */
  posterUrl?: string;
  ariaLabel?: string;
}

/**
 * Apple-style scroll-scrubbed canvas image sequence.
 *
 * Architecture is complete (DPR scaling, preloading, loading indicator,
 * scroll-driven frame index, reduced-motion fallback). It is intentionally
 * NOT wired into the homepage yet because no rendered frame assets exist —
 * see the asset manifest. Drop frames in and mount this to activate.
 */
export function FrameSequence({
  frameUrl,
  frameCount,
  width,
  height,
  scroll = "+=300%",
  className = "",
  posterUrl,
  ariaLabel,
}: FrameSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const stateRef = useRef({ frame: 0 });
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload frames.
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let done = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = () => {
        if (cancelled) return;
        done += 1;
        setLoaded(done);
        if (done === frameCount) setReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        done += 1;
        setLoaded(done);
        if (done === frameCount) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, [frameUrl, frameCount]);

  // DPR-aware draw.
  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  const resize = () => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrap.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    draw(stateRef.current.frame);
  };

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap || !ready) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        resize();
        window.addEventListener("resize", resize);

        const st = stateRef.current;
        const anim = gsap.to(st, {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: scroll,
            pin: true,
            scrub: 0.5,
          },
          onUpdate: () => draw(st.frame),
        });

        return () => {
          window.removeEventListener("resize", resize);
          anim.scrollTrigger?.kill();
          anim.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [ready] },
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [ready]);

  const pct = frameCount > 0 ? Math.round((loaded / frameCount) * 100) : 0;

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role={ariaLabel ? "img" : "presentation"}
        aria-label={ariaLabel}
      />
      {/* Reduced-motion / loading poster */}
      {(!ready || pct < 100) && posterUrl && (
        <img
          src={posterUrl}
          alt={ariaLabel ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!ready && (
        <div className="absolute inset-0 flex items-end justify-center pb-10">
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-ivory/60">
            Loading {pct}%
          </span>
        </div>
      )}
    </div>
  );
}

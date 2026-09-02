"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  Smartphone,
  Move,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getProductImage } from "@/lib/images";
import {
  getTouchDistance,
  isCameraAvailable,
  isWebXRARSupported,
  startCameraStream,
  stopCameraStream,
} from "@/lib/ar/camera-utils";
import type { WebXRARController } from "@/lib/ar/webxr-ar";

interface PlaceInRoomProps {
  slug: string;
  name: string;
  categorySlugs: string[];
}

type ARMode = "idle" | "camera" | "webxr";

export function PlaceInRoom({ slug, name, categorySlugs }: PlaceInRoomProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ARMode>("idle");
  const [supportsWebXR, setSupportsWebXR] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 55 });
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const webxrRef = useRef<WebXRARController | null>(null);
  const pinchRef = useRef({ startDist: 0, startScale: 1 });
  const dragRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const startedRef = useRef(false);

  const productImage = getProductImage(slug, categorySlugs);

  useEffect(() => {
    void isWebXRARSupported().then(setSupportsWebXR);
  }, []);

  const stopAll = useCallback(() => {
    webxrRef.current?.cleanup();
    webxrRef.current = null;
    stopCameraStream(streamRef.current);
    streamRef.current = null;
    setMode("idle");
    setLoading(false);
    startedRef.current = false;
  }, []);

  const close = useCallback(() => {
    stopAll();
    setOpen(false);
    setError(null);
    setPlaced(false);
    setScale(1);
    setRotation(0);
    setPos({ x: 50, y: 55 });
  }, [stopAll]);

  const startCameraAR = useCallback(async () => {
    setError(null);
    if (!(await isCameraAvailable())) {
      throw new Error("No camera found. Please use a phone or tablet.");
    }
    const video = videoRef.current;
    if (!video) throw new Error("Camera not ready — try again");
    streamRef.current = await startCameraStream(video, "environment");
    setMode("camera");
    setPlaced(false);
  }, []);

  const startWebXR = useCallback(async () => {
    setError(null);
    const { startWebXRAR } = await import("@/lib/ar/webxr-ar");
    const container = containerRef.current;
    if (!container) throw new Error("AR not ready");

    const url = productImage.startsWith("/")
      ? `${window.location.origin}${productImage}`
      : productImage;

    webxrRef.current = await startWebXRAR(
      container,
      document.body,
      url,
      () => setPlaced(true),
      (msg) => setError(msg)
    );
    setMode("webxr");
  }, [productImage]);

  // Start AR after modal mounts (video element must exist)
  useEffect(() => {
    if (!open) {
      startedRef.current = false;
      return;
    }
    if (startedRef.current) return;

    startedRef.current = true;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      try {
        if (supportsWebXR) {
          await startWebXR();
        } else {
          await startCameraAR();
        }
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Could not start AR";
        try {
          await startCameraAR();
        } catch {
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, supportsWebXR, startWebXR, startCameraAR]);

  useEffect(() => {
    if (!open) return () => stopAll();
    return () => stopAll();
  }, [open, stopAll]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (mode !== "camera") return;
    if (e.touches.length === 2) {
      pinchRef.current = { startDist: getTouchDistance(e.touches), startScale: scale };
    } else if (e.touches.length === 1) {
      const t = e.touches[0]!;
      dragRef.current = {
        dragging: true,
        startX: t.clientX,
        startY: t.clientY,
        origX: pos.x,
        origY: pos.y,
      };
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (mode !== "camera") return;
    e.preventDefault();
    if (e.touches.length === 2 && pinchRef.current.startDist > 0) {
      const dist = getTouchDistance(e.touches);
      setScale(
        Math.min(2.5, Math.max(0.3, pinchRef.current.startScale * (dist / pinchRef.current.startDist)))
      );
      setPlaced(true);
    } else if (e.touches.length === 1 && dragRef.current?.dragging) {
      const t = e.touches[0]!;
      const dx = ((t.clientX - dragRef.current.startX) / window.innerWidth) * 100;
      const dy = ((t.clientY - dragRef.current.startY) / window.innerHeight) * 100;
      setPos({
        x: Math.min(92, Math.max(8, dragRef.current.origX + dx)),
        y: Math.min(88, Math.max(12, dragRef.current.origY + dy)),
      });
      setPlaced(true);
    }
  };

  const onTouchEnd = () => {
    dragRef.current = null;
    pinchRef.current = { startDist: 0, startScale: scale };
  };

  const productSizePx = Math.round(140 * scale);

  return (
    <>
      <section className="mt-6 rounded-2xl border-2 border-dashed border-saffron/30 bg-gradient-to-br from-saffron/5 to-gold/5 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-lg shadow-saffron/25">
            <Smartphone className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-devanagari text-saffron text-sm tracking-wider">अपने कमरे में देखें</p>
            <h2 className="font-display text-lg text-brown mt-0.5">View in your room</h2>
            <p className="text-sm text-brown-light mt-1">
              Opens your phone camera — point at your mandir, table, or shelf and place the item
              (like Amazon AR).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-shine flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-saffron to-gold text-white font-semibold shadow-lg shadow-saffron/25 hover:shadow-xl transition-all w-full sm:w-auto"
          >
            <Camera className="w-5 h-5" />
            Open camera & place
          </button>
        </div>
        <p className="mt-3 text-[11px] text-brown-light">
          Best on mobile · Uses rear camera · Pinch to resize, drag to move
        </p>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black"
          >
            {/* Always mount video so ref is ready before stream starts */}
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover ${
                mode === "camera" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              playsInline
              muted
              autoPlay
            />

            <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

            {mode === "camera" && (
              <div
                className="absolute inset-0 touch-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: productSizePx,
                    height: productSizePx,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={productImage}
                      alt={name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      unoptimized
                      draggable={false}
                    />
                  </div>
                </div>

                <div
                  className="absolute rounded-full bg-black/30 blur-lg pointer-events-none"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y + 7}%`,
                    width: productSizePx * 0.65,
                    height: 14,
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {!placed && !loading && (
                  <div className="absolute inset-x-4 top-20 flex justify-center pointer-events-none">
                    <div className="px-4 py-3 rounded-2xl bg-black/65 text-white text-sm backdrop-blur-md text-center max-w-xs">
                      <Move className="w-4 h-4 inline mr-1.5" />
                      Point camera at your puja table or shelf
                      <br />
                      <span className="text-saffron-light text-xs mt-1 block">
                        Drag to move · Pinch to resize
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* UI overlay */}
            <div className="absolute inset-0 flex flex-col pointer-events-none">
              <div className="pointer-events-auto flex items-center justify-between p-4 bg-gradient-to-b from-black/75 to-transparent">
                <div className="text-white">
                  <p className="text-xs opacity-70">Live camera · {name}</p>
                  {mode === "webxr" && (
                    <p className="text-[10px] text-saffron-light mt-0.5">Tap surface to place</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="p-2.5 rounded-full bg-white/20 text-white backdrop-blur-sm"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loading && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white bg-black/50 px-4 py-3 rounded-xl">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Opening camera…
                  </div>
                </div>
              )}

              {placed && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 mt-2 pointer-events-none"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600/90 text-white text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Placed in your room
                  </span>
                </motion.div>
              )}

              <div className="mt-auto pointer-events-auto p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-black/85 to-transparent">
                {error && (
                  <p className="text-xs text-red-200 bg-red-900/60 rounded-lg px-3 py-2 mb-3 text-center">
                    {error}
                  </p>
                )}

                {mode === "camera" && !loading && (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setScale((s) => Math.min(2.5, s + 0.15));
                        setPlaced(true);
                      }}
                      className="p-3.5 rounded-full bg-white/20 text-white backdrop-blur-sm active:scale-95"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setScale((s) => Math.max(0.3, s - 0.15));
                        setPlaced(true);
                      }}
                      className="p-3.5 rounded-full bg-white/20 text-white backdrop-blur-sm active:scale-95"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRotation((r) => r + 15);
                        setPlaced(true);
                      }}
                      className="p-3.5 rounded-full bg-white/20 text-white backdrop-blur-sm active:scale-95"
                    >
                      <RotateCw className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPos({ x: 50, y: 55 });
                        setScale(1);
                        setRotation(0);
                        setPlaced(false);
                      }}
                      className="p-3.5 rounded-full bg-white/20 text-white backdrop-blur-sm active:scale-95"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {mode === "webxr" && webxrRef.current && (
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setScale((s) => s + 0.1);
                        webxrRef.current?.setScale(scale + 0.1);
                      }}
                      className="p-3 rounded-full bg-white/20 text-white"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        webxrRef.current?.resetPlacement();
                        setPlaced(false);
                      }}
                      className="px-5 py-2.5 rounded-full bg-saffron text-white text-sm font-medium"
                    >
                      Move again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Check WebXR AR support (Android Chrome, etc.) */
export async function isWebXRARSupported(): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.xr) return false;
  try {
    return await navigator.xr.isSessionSupported("immersive-ar");
  } catch {
    return false;
  }
}

/** Check rear camera availability */
export async function isCameraAvailable(): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) return false;
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some((d) => d.kind === "videoinput");
  } catch {
    return true; // assume yes, will fail on permission
  }
}

export function getTouchDistance(touches: { length: number; [index: number]: { clientX: number; clientY: number } }): number {
  if (touches.length < 2) return 0;
  const a = touches[0]!;
  const b = touches[1]!;
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export async function startCameraStream(
  video: HTMLVideoElement,
  facingMode: "environment" | "user" = "environment"
): Promise<MediaStream> {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: facingMode },
      width: { ideal: 1920 },
      height: { ideal: 1080 },
    },
    audio: false,
  });
  video.srcObject = stream;
  await video.play();
  return stream;
}

export function stopCameraStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((t) => t.stop());
}

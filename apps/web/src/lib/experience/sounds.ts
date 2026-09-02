/** Web Audio–synthesized spiritual sounds (no external files). */

let sharedContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedContext) {
    sharedContext = new AudioContext();
  }
  return sharedContext;
}

async function resume(ctx: AudioContext) {
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
}

/** Deep temple bell — harmonics with long decay */
export async function playTempleBell(volume = 0.35) {
  const ctx = getContext();
  if (!ctx) return;
  await resume(ctx);

  const now = ctx.currentTime;
  const freqs = [220, 329.63, 440, 554.37, 659.25];

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i === 0 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 2);

    const peak = (volume * 0.22) / (i + 0.8);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5 + i * 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 4.5);
  });

  const noise = ctx.createOscillator();
  const noiseGain = ctx.createGain();
  noise.type = "sine";
  noise.frequency.setValueAtTime(1200, now);
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(volume * 0.04, now + 0.01);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 1.5);
}

/** Gentle single chime — add to cart */
export async function playSoftChime(volume = 0.2) {
  const ctx = getContext();
  if (!ctx) return;
  await resume(ctx);

  const now = ctx.currentTime;
  [523.25, 659.25].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.15, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8 + i * 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.05);
    osc.stop(now + 1.2);
  });
}

/** Triumphant bell sequence — order success */
export async function playSuccessCelebration(volume = 0.3) {
  await playTempleBell(volume * 0.7);
  setTimeout(() => void playSoftChime(volume * 0.5), 600);
  setTimeout(() => void playTempleBell(volume * 0.4), 1200);
}

export const SOUND_PREF_KEY = "mypavitra-sound-enabled";
export const ENTRY_SEEN_KEY = "mypavitra-entry-seen";

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(SOUND_PREF_KEY);
  return stored !== "false";
}

export function setSoundEnabledPref(enabled: boolean) {
  localStorage.setItem(SOUND_PREF_KEY, enabled ? "true" : "false");
}

export function hasSeenTempleEntry(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(ENTRY_SEEN_KEY) === "true";
}

export function markTempleEntrySeen() {
  sessionStorage.setItem(ENTRY_SEEN_KEY, "true");
}

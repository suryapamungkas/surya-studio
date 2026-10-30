import type Lenis from "lenis";

/** Referensi global instance Lenis (diisi oleh Providers) */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function lockScroll(lock: boolean) {
  if (instance) {
    if (lock) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = lock ? "hidden" : "";
}

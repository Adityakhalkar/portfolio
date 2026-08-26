import type Lenis from "lenis";

/* Lenis scrolls programmatically, so `overflow: hidden` on body does nothing to
   it. Anything that opens over the page has to stop the instance itself. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const lockScroll = () => instance?.stop();
export const unlockScroll = () => instance?.start();

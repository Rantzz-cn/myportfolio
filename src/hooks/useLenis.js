import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initializes Lenis smooth scroll on mount. Disabled on touch devices and
 * when prefers-reduced-motion is set, matching the original main.js logic.
 */
export function useLenis() {
  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobileDevice || prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

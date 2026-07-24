import { useEffect, useState } from 'react';

/**
 * Lightweight technical preloader:
 * - Total duration ~1.1s
 * - Checks sessionStorage ('portfolio_preloader_seen') to run once per session
 * - Bypasses animation if prefers-reduced-motion is active
 * - Includes a 1.5s hard safety timeout to guarantee accessibility
 */
export function Preloader({ onDone }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_preloader_seen');
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenPreloader || prefersReducedMotion) {
      onDone();
      return;
    }

    // Safety timeout: dismiss after 1400ms max under all conditions
    const safetyTimer = setTimeout(() => {
      dismiss();
    }, 1400);

    const animationTimer = setTimeout(() => {
      dismiss();
    }, 1100);

    function dismiss() {
      clearTimeout(safetyTimer);
      clearTimeout(animationTimer);
      try {
        sessionStorage.setItem('portfolio_preloader_seen', 'true');
      } catch (e) {
        /* ignore storage quota/privacy mode errors */
      }
      setHidden(true);
      setTimeout(onDone, 300);
    }

    return () => {
      clearTimeout(safetyTimer);
      clearTimeout(animationTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="preloader" className={`preloader${hidden ? ' is-hidden' : ''}`} aria-hidden="true">
      <div className="preloader__content">
        <div className="preloader__brand">
          RT<span> / 2026</span>
        </div>
        <div className="preloader__bar-container">
          <div className="preloader__bar"></div>
        </div>
        <div className="preloader__label">INITIALIZING PORTFOLIO</div>
      </div>
    </div>
  );
}

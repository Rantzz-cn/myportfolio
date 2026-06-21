import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Generic scroll-reveal hook: observes elements matching `selector` *inside*
 * the container the returned ref is attached to, and animates each into
 * view the first time it enters the viewport. Replaces animations.js's
 * createScrollReveal().
 *
 * IMPORTANT: attach the returned ref to an ancestor that wraps every element
 * matched by `selector` — including cases where one matched class is nested
 * inside another matched class (e.g. '.about__content, .about__highlight',
 * where highlights live inside content). Never attach it directly to one of
 * the matched elements itself.
 *
 * @param {string} selector - CSS selector (relative to the container) of elements to reveal
 * @param {object} animeOptions - extra Anime.js properties (translateY, delay, easing, etc.)
 * @param {object} observerOptions - IntersectionObserver options (default threshold 0.2)
 * @param {Array} deps - dependency array to re-run observation (e.g. after async data renders)
 */
export function useScrollReveal(selector, animeOptions, observerOptions, deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll(selector));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          anime({
            targets: entry.target,
            opacity: [0, 1],
            ...animeOptions,
          });
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        });
      },
      observerOptions || { threshold: 0.2 }
    );

    elements.forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

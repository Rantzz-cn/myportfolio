import { useEffect, useState } from 'react';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];

/**
 * Tracks scroll position to drive: active nav link, navbar shadow,
 * and back-to-top button visibility. Replaces navigation.js's onScroll.
 */
export function useScrollSpy() {
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let current = activeIdFallback();
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          current = id;
        }
      });
      setActiveId(current);
      setScrolled(window.scrollY > 8);
      setShowBackToTop(window.scrollY > 480);
    }

    function activeIdFallback() {
      return 'hero';
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', onScroll);
    };
  }, []);

  return { activeId, scrolled, showBackToTop };
}

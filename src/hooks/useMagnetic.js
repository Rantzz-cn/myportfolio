import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Attaches the "magnetic" cursor-follow effect used on .btn elements.
 * Replaces animations.js's initMagneticButtons(), scoped to a single ref
 * instead of querying all .btn elements globally.
 */
export function useMagnetic(strength = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMouseMove(event) {
      const bounds = el.getBoundingClientRect();
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;

      anime({
        targets: el,
        translateX: relX * strength,
        translateY: relY * strength,
        duration: 300,
        easing: 'easeOutQuad',
      });
    }

    function onMouseLeave() {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: 'easeOutElastic(1, .6)',
      });
    }

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return ref;
}

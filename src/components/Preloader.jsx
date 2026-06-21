import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

/**
 * Counts 0→100 over 1.8s, then slides away and fires onDone().
 * Replaces main.js's initPreloader().
 */
export function Preloader({ onDone }) {
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const counterObj = { val: 0 };
    const animation = anime({
      targets: counterObj,
      val: 100,
      round: 1,
      easing: 'easeInOutExpo',
      duration: 1800,
      update: () => {
        setPercent(counterObj.val);
        if (barRef.current) barRef.current.style.width = counterObj.val + '%';
      },
      complete: () => {
        setTimeout(() => {
          setHidden(true);
          setTimeout(onDone, 400);
        }, 300);
      },
    });

    return () => animation.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="preloader" className={`preloader${hidden ? ' is-hidden' : ''}`} aria-hidden="true">
      <div className="preloader__content">
        <div className="preloader__counter">{percent}%</div>
        <div className="preloader__brand">
          RANIER<span>.DEV</span>
        </div>
        <div className="preloader__bar-container">
          <div className="preloader__bar" ref={barRef}></div>
        </div>
      </div>
    </div>
  );
}

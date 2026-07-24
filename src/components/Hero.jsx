import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Button } from './Button';
import profileImg from '../assets/images/profile.png';

const HERO_NAME = 'Ranier Teraldico';

/**
 * Splits "Ranier Teraldico" into per-character spans.
 * Applies hero__name-word--surname to "Teraldico" for proportional control.
 */
function SplitName() {
  const words = HERO_NAME.split(' ');
  return (
    <h1 className="hero__name">
      {words.map((word, wi) => (
        <span
          key={wi}
          className={`hero__name-word${wi === 1 ? ' hero__name-word--surname' : ''}`}
        >
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((char, ci) => (
              <span className="char" key={ci} style={{ opacity: 0 }}>
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && <span style={{ display: 'inline-block', width: '0.28em' }} />}
        </span>
      ))}
    </h1>
  );
}

export function Hero({ ready }) {
  const visualRef = useRef(null);
  const robotRef = useRef(null);

  /* Entrance timeline — runs once the preloader has finished */
  useEffect(() => {
    if (!ready) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      anime.set('.hero__greeting, .hero__name .char, .hero__role, .hero__description, .hero__actions, .hero__proof, .hero__visual', { opacity: 1, translateY: 0 });
      return;
    }

    anime
      .timeline({ easing: 'easeOutExpo' })
      .add({ targets: '.hero__greeting', opacity: [0, 1], translateY: [16, 0], duration: 600 })
      .add(
        {
          targets: '.hero__name .char',
          opacity: [0, 1],
          translateY: [28, 0],
          rotateZ: [4, 0],
          delay: anime.stagger(24),
          duration: 650,
        },
        '-=350'
      )
      .add(
        {
          targets: '.hero__role, .hero__description, .hero__actions, .hero__proof',
          opacity: [0, 1],
          translateY: [18, 0],
          delay: anime.stagger(90),
          duration: 650,
        },
        '-=280'
      )
      .add(
        { targets: '.hero__visual', opacity: [0, 1], translateY: [18, 0], scale: [0.97, 1], duration: 800 },
        '-=550'
      );
  }, [ready]);

  /* Continuous idle float (bypassed if reduced motion preferred) */
  useEffect(() => {
    if (!robotRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animation = anime({
      targets: robotRef.current,
      translateY: [-6, 6],
      duration: 3600,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    });
    return () => animation.pause();
  }, []);

  /* Mouse parallax on the portrait */
  useEffect(() => {
    const stage = visualRef.current;
    const robot = robotRef.current;
    if (!stage || !robot) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const strength = 12;

    function onMouseMove(event) {
      const bounds = stage.getBoundingClientRect();
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
      anime({
        targets: robot,
        translateX: relX * strength,
        rotateY: relX * 6,
        rotateX: relY * -6,
        duration: 500,
        easing: 'easeOutQuad',
      });
    }

    function onMouseLeave() {
      anime({
        targets: robot,
        translateX: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 700,
        easing: 'easeOutElastic(1, .6)',
      });
    }

    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseleave', onMouseLeave);
    return () => {
      stage.removeEventListener('mousemove', onMouseMove);
      stage.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="hero" aria-label="Introduction">
      <div className="container hero">
        <div className="hero__content">
          <p className="hero__greeting pill" style={{ opacity: 0 }}>
            <span className="pill__dot" aria-hidden="true"></span>
            Independent developer · Philippines
          </p>
          <SplitName />
          <p className="hero__role" style={{ opacity: 0 }}>
            Design-minded web developer
          </p>
          <p className="hero__description" style={{ opacity: 0 }}>
            I turn ambitious ideas into fast, expressive digital products—combining clean code,
            sharp visual systems, and interactions that feel genuinely considered.
          </p>
          <div className="hero__actions" style={{ opacity: 0 }}>
            <Button href="#projects" variant="primary">
              Explore selected work
            </Button>
            <Button href="#contact" variant="outline" icon="↗">
              Start a conversation
            </Button>
          </div>
          <dl className="hero__proof" style={{ opacity: 0 }} aria-label="Portfolio summary">
            <div>
              <dt>Selected work</dt>
              <dd>7 shipped projects</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Websites &amp; web apps</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd><span aria-hidden="true"></span> Available for work</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual" ref={visualRef} style={{ opacity: 0 }}>
          <div className="hero__robot-wrapper" ref={robotRef}>
            <div className="hero__robot-glow" aria-hidden="true"></div>
            <img
              id="profile-img"
              className="hero__robot"
              src={profileImg}
              alt="Black and white portrait of Ranier Teraldico, web developer"
              width="600"
              height="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

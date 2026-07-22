import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Button } from './Button';
import profileImg from '../assets/images/profile.png';

const HERO_NAME = 'Ranier Teraldico';

/**
 * Splits "Ranier Teraldico" into per-character spans (wrapped per word so
 * words don't break mid-line), matching animations.js's splitHeroName().
 */
function SplitName() {
  const words = HERO_NAME.split(' ');
  return (
    <h1 className="hero__name">
      {words.map((word, wi) => (
        <span key={wi}>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((char, ci) => (
              <span className="char" key={ci} style={{ opacity: 0 }}>
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3em' }} />}
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

    anime
      .timeline({ easing: 'easeOutExpo' })
      .add({ targets: '.hero__greeting', opacity: [0, 1], translateY: [20, 0], duration: 700 })
      .add(
        {
          targets: '.hero__name .char',
          opacity: [0, 1],
          translateY: [36, 0],
          rotateZ: [6, 0],
          delay: anime.stagger(28),
          duration: 700,
        },
        '-=400'
      )
      .add(
        {
          targets: '.hero__role, .hero__description, .hero__actions, .hero__proof',
          opacity: [0, 1],
          translateY: [24, 0],
          delay: anime.stagger(110),
          duration: 750,
        },
        '-=300'
      )
      .add(
        { targets: '.hero__visual', opacity: [0, 1], translateY: [24, 0], scale: [0.96, 1], duration: 900 },
        '-=650'
      )
      .add({ targets: '.hero__scroll-cue', opacity: [0, 1], duration: 600 }, '-=300');
  }, [ready]);

  /* Continuous idle float */
  useEffect(() => {
    if (!robotRef.current) return;
    const animation = anime({
      targets: robotRef.current,
      translateY: [-12, 12],
      duration: 3200,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    });
    return () => animation.pause();
  }, []);

  /* Mouse parallax on the robot/portrait */
  useEffect(() => {
    const stage = visualRef.current;
    const robot = robotRef.current;
    if (!stage || !robot) return;
    const strength = 18;

    function onMouseMove(event) {
      const bounds = stage.getBoundingClientRect();
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
      anime({
        targets: robot,
        translateX: relX * strength * 2,
        rotateY: relX * 10,
        rotateX: relY * -10,
        duration: 600,
        easing: 'easeOutQuad',
      });
    }

    function onMouseLeave() {
      anime({
        targets: robot,
        translateX: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 800,
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
            <Button href="#contact" variant="outline">
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
              alt="Portrait of Ranier Teraldico"
              width="600"
              height="600"
            />
          </div>
        </div>

        <div className="hero__scroll-cue" style={{ opacity: 0 }}>
          <span>Scroll</span>
          <span className="hero__scroll-cue-line"></span>
        </div>
      </div>
    </section>
  );
}

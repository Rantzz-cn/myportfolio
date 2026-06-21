import { useScrollReveal } from '../hooks/useScrollReveal';
import { aboutHighlights } from '../data/contact';

export function About() {
  const ref = useScrollReveal(
    '.about__content, .about__highlight',
    { translateY: [20, 0], delay: 80, duration: 700, easing: 'easeOutQuad' },
    { threshold: 0.2 }
  );

  return (
    <section id="about" className="section" aria-label="About me">
      <div className="container" ref={ref}>
        <div className="section__header">
          <span className="section__eyebrow">About</span>
          <h2 className="section__title">A little about me</h2>
        </div>

        <div className="about__content">
          <p className="about__text">
            I'm a Web Developer focused on building fast, accessible, and visually clean websites. I
            enjoy turning ideas into functional interfaces — solving real problems along the way and
            paying close attention to how a site looks and feels across every screen size.
          </p>
          <p className="about__text">
            My approach blends solid frontend fundamentals with an eye for UI/UX, so the things I
            build are not only easy to use but also enjoyable to interact with.
          </p>

          <div className="about__highlights">
            {aboutHighlights.map((label) => (
              <div className="about__highlight" key={label}>
                <span className="about__highlight-icon" aria-hidden="true">
                  ✓
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

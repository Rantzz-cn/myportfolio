import { useScrollReveal } from '../hooks/useScrollReveal';
import { certifications } from '../data/certifications';

export function Certifications() {
  const ref = useScrollReveal(
    '.cert-card',
    { translateY: [20, 0], delay: 80, duration: 700, easing: 'easeOutQuad' },
    { threshold: 0.2 }
  );

  return (
    <section id="certifications" className="section" aria-label="Certifications and achievements">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Recognition</span>
          <h2 className="section__title">Certifications &amp; achievements</h2>
        </div>

        <div className="certs__grid" ref={ref}>
          {certifications.map((cert) => (
            <div className="card cert-card" key={cert.id}>
              <span className="cert-card__icon" aria-hidden="true">
                ★
              </span>
              <div>
                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__subtitle">{cert.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useScrollReveal } from '../hooks/useScrollReveal';
import { experience } from '../data/experience';

export function Experience() {
  const ref = useScrollReveal(
    '.timeline-item',
    { translateX: [-24, 0], duration: 700, easing: 'easeOutCubic' },
    { threshold: 0.25 }
  );

  return (
    <section id="experience" className="section" aria-label="Experience">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Experience</span>
          <h2 className="section__title">Where I've worked</h2>
        </div>

        <div className="timeline" ref={ref}>
          {experience.map((item) => (
            <div className="timeline-item" key={item.id}>
              <div className="timeline-item__meta">
                <h3 className="timeline-item__role">{item.role}</h3>
                <span className="timeline-item__date">{item.date}</span>
              </div>
              <p className="timeline-item__description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

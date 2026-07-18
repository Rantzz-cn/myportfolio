import { useScrollReveal } from '../hooks/useScrollReveal';
import { skillGroups } from '../data/skills';

export function Skills() {
  const ref = useScrollReveal(
    '.skill-card',
    { translateY: [24, 0], delay: 90, duration: 700, easing: 'easeOutQuad' },
    { threshold: 0.2 }
  );

  return (
    <section id="skills" className="section" aria-label="Skills">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Skills</span>
          <h2 className="section__title">Tools &amp; technologies</h2>
          <p className="section__subtitle">
            A snapshot of the languages, tools, and design software I use to plan, build, and ship
            websites.
          </p>
        </div>

        <div className="skills__grid" ref={ref}>
          {skillGroups.map((group) => (
            <div className="card skill-card" key={group.id}>
              <h3 className="skill-card__title">{group.title}</h3>
              <ul className="skill-card__list">
                {group.items.map((item) => (
                  <li className="skill-card__item" key={item.label}>
                    <span
                      className={`skill-card__icon${item.className ? ` ${item.className}` : ''}${item.wideLogo ? ' skill-card__icon--crop' : ''}`}
                      aria-hidden={item.text ? 'true' : undefined}
                    >
                      {item.image ? (
                        <img
                          className={`skill-card__brand-logo${item.wideLogo ? ' skill-card__brand-logo--crop' : ''}`}
                          src={item.image}
                          alt=""
                        />
                      ) : item.icon ? (
                        <iconify-icon icon={item.icon} width="20" style={item.color ? { color: item.color } : undefined}></iconify-icon>
                      ) : (
                        item.text
                      )}
                    </span>{' '}
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

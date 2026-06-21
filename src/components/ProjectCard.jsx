import { useRef } from 'react';
import { Button } from './Button';

/**
 * Single project card with the cursor-aware spotlight glow
 * (initProjectSpotlight in the original).
 */
export function ProjectCard({ project }) {
  const cardRef = useRef(null);

  function onMouseMove(event) {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    card.style.setProperty('--spot-x', x + '%');
    card.style.setProperty('--spot-y', y + '%');
  }

  return (
    <article
      className="card project-card"
      ref={cardRef}
      onMouseMove={onMouseMove}
      style={{
        '--spot-x': '50%',
        '--spot-y': '0%',
        backgroundImage:
          'radial-gradient(380px circle at var(--spot-x) var(--spot-y), rgba(215,255,61,0.06), transparent 70%)',
      }}
    >
      <div className="project-card__media">
        <img
          className="project-card__image"
          src={project.image}
          alt={project.alt}
          loading="lazy"
          width="800"
          height="500"
        />
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__tech">
          {project.tech.map((item) => (
            <span className="badge" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="project-card__actions">
          <Button href={project.demoUrl} variant="primary" target="_blank" rel="noopener noreferrer">
            Live Demo
          </Button>
          <Button href={project.githubUrl} variant="outline" target="_blank" rel="noopener noreferrer">
            GitHub
          </Button>
        </div>
      </div>
    </article>
  );
}

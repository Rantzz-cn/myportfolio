import { useRef } from 'react';
import { Button } from './Button';

/**
 * Single project card with the cursor-aware spotlight glow
 * (initProjectSpotlight in the original).
 */
export function ProjectCard({ project, featured = false, compact = false, index }) {
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

  const hasDemo = project.demoUrl && project.demoUrl !== '#';
  const hasGithub = project.githubUrl && project.githubUrl !== '#';
  const primaryUrl = hasDemo ? project.demoUrl : hasGithub ? project.githubUrl : null;

  return (
    <article
      className={`card project-card${featured ? ' project-card--featured' : ''}${compact ? ' project-card--compact' : ''}`}
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
        {primaryUrl ? (
          <a
            className="project-card__media-link"
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} ${hasDemo ? 'live project' : 'source code'}`}
          >
            <img
              className="project-card__image"
              src={project.image}
              alt={project.alt}
              style={project.imageFit ? { objectFit: project.imageFit } : undefined}
              loading="lazy"
              width="800"
              height="500"
            />
            <span className="project-card__open" aria-hidden="true">Open {hasDemo ? 'live site' : 'source'} ↗</span>
          </a>
        ) : (
          <img
            className="project-card__image"
            src={project.image}
            alt={project.alt}
            style={project.imageFit ? { objectFit: project.imageFit } : undefined}
            loading="lazy"
            width="800"
            height="500"
          />
        )}
        <div className="project-card__media-meta">
          {project.featured && <span className="project-card__featured">Featured</span>}
          <span>{project.year}</span>
        </div>
      </div>
      <div className="project-card__body">
        <div className="project-card__heading">
          <div className="project-card__kicker">
            <span className="project-card__category">{project.category}</span>
            {compact && <span className="project-card__index">{String(index).padStart(2, '0')}</span>}
          </div>
          <h3 className="project-card__title">{project.title}</h3>
        </div>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__tech">
          {project.tech.map((item) => (
            <span className="badge" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="project-card__actions">
          {hasDemo && (
            <Button href={project.demoUrl} variant="primary" target="_blank" rel="noopener noreferrer">
              View project <span aria-hidden="true">↗</span>
            </Button>
          )}
          {hasGithub && (
            <Button href={project.githubUrl} variant="outline" target="_blank" rel="noopener noreferrer">
              Source code <span aria-hidden="true">↗</span>
            </Button>
          )}
          {!hasDemo && !hasGithub && <span className="project-card__private">Private project</span>}
        </div>
      </div>
    </article>
  );
}

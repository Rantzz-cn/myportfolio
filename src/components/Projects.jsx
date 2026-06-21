import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  const ref = useScrollReveal(
    '.project-card',
    { translateY: [36, 0], duration: 800, easing: 'easeOutCubic' },
    { threshold: 0.15 }
  );

  return (
    <section id="projects" className="section" aria-label="Featured projects">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Work</span>
          <h2 className="section__title">Featured projects</h2>
          <p className="section__subtitle">
            A selection of recent builds — from concept landing pages to small interactive
            experiences.
          </p>
        </div>

        <div className="projects__grid" ref={ref}>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

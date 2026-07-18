import { useMemo, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category).filter(Boolean))],
    []
  );
  const visibleProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);
  const featuredProject = activeCategory === 'All'
    ? visibleProjects.find((project) => project.featured)
    : null;
  const gridProjects = featuredProject
    ? visibleProjects.filter((project) => project.id !== featuredProject.id)
    : visibleProjects;

  const ref = useScrollReveal(
    '.project-card',
    { translateY: [36, 0], duration: 800, easing: 'easeOutCubic' },
    { threshold: 0.15 }
  );

  return (
    <section id="projects" className="section" aria-label="Selected projects">
      <div className="container">
        <div className="section__header projects__header">
          <span className="section__eyebrow">Selected work · {projects.length} projects</span>
          <h2 className="section__title">Ideas, designed and shipped.</h2>
          <p className="section__subtitle">
            A growing collection of websites and digital products, built from concept through
            to polished, responsive experiences.
          </p>
        </div>

        <div className="projects__toolbar">
          <div className="projects__filters" role="group" aria-label="Filter projects by type">
            {categories.map((category) => (
              <button
                className={`projects__filter${activeCategory === category ? ' is-active' : ''}`}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="projects__result-count" aria-live="polite">
            {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <div className="projects__showcase" ref={ref}>
          {featuredProject && (
            <ProjectCard project={featuredProject} featured />
          )}
          <div className="projects__grid">
            {gridProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

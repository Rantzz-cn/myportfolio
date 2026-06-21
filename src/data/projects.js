import project1 from '../assets/images/project-1.png';
import project2 from '../assets/images/project-2.png';
import project3 from '../assets/images/project-3.png';

export const projects = [
  {
    id: 'unknown-coffee',
    title: 'UN.KNOWN Coffee',
    description:
      'A modern landing page for a specialty coffee brand, built with a focus on rich imagery, clear product storytelling, and a smooth mobile ordering experience.',
    image: project1,
    alt: 'UN.KNOWN Coffee project preview',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://unknowncoffee.netlify.app/',
    githubUrl: '#',
  },
  {
    id: 'lunico',
    title: 'Lunico',
    description:
      'A sleek single-page concept site featuring animated sections, a responsive layout, and interactive UI components designed for a clean, modern feel.',
    image: project2,
    alt: 'Lunico project preview',
    tech: ['HTML', 'CSS', 'JavaScript', 'Anime.js'],
    demoUrl: 'https://lunico.netlify.app/',
    githubUrl: '#',
  },
  {
    id: 'draftix',
    title: 'Draftix',
    description:
      'Draftix is a Valorant strategy tool for analyzing the agent banning phase and map pool. It helps players plan smarter team compositions and counter-picks before matches by simplifying pre-game decision-making.',
    image: project3,
    alt: 'Draftix project preview',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Rantzz-cn/draftix',
  },
];

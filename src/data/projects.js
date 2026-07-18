import project1 from '../assets/images/project-1.png';
import project2 from '../assets/images/project-2.png';
import project3 from '../assets/images/project-3.png';
import kuroCheatsImage from '../assets/images/project-kurocheats.png';
import repMateImage from '../assets/images/project-repmate.png';
import allFireImage from '../assets/images/project-allfire.png';

export const projects = [
  {
    id: 'unknown-coffee',
    title: 'UN.KNOWN Coffee',
    description:
      'A modern landing page for a specialty coffee brand, built with a focus on rich imagery, clear product storytelling, and a smooth mobile ordering experience.',
    image: project1,
    alt: 'UN.KNOWN Coffee project preview',
    category: 'Websites',
    year: '2026',
    featured: true,
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
    category: 'Websites',
    year: '2026',
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
    category: 'Web Apps',
    year: '2026',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Rantzz-cn/draftix',
  },
  {
    id: 'kurocheats',
    title: 'KuroCheats',
    description:
      'A full-featured gaming software storefront with product discovery, category browsing, cart and checkout flows, customer support, and real-time service status pages.',
    image: kuroCheatsImage,
    alt: 'KuroCheats gaming software storefront preview',
    category: 'E-commerce',
    year: '2026',
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    demoUrl: 'https://kurocheats.vercel.app/',
    githubUrl: '#',
  },
  {
    id: 'repmate',
    title: 'RepMate',
    description:
      'A progressive fitness platform for planning workouts, exploring exercises, tracking progress, and staying connected through social training circles and an AI gym companion.',
    image: repMateImage,
    alt: 'RepMate fitness platform preview',
    category: 'Web Apps',
    year: '2026',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PWA'],
    demoUrl: 'https://repmategym.vercel.app/',
    githubUrl: '#',
    imageFit: 'contain',
  },
  {
    id: 'all-fire-services',
    title: 'All Fire Services',
    description:
      'A responsive business website for a Sydney fire protection company, presenting compliance services, industry credentials, project coverage, and clear customer enquiry paths.',
    image: allFireImage,
    alt: 'All Fire Services Sydney website preview',
    category: 'Websites',
    year: '2026',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    demoUrl: 'https://allfiresydney.netlify.app/',
    githubUrl: '#',
  },
];

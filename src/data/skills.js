export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      { icon: 'logos:html-5', label: 'HTML' },
      { icon: 'logos:css-3', label: 'CSS' },
      { icon: 'logos:javascript', label: 'JavaScript' },
      { icon: 'logos:react', label: 'React' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: [
      { icon: 'logos:mysql', label: 'MySQL' },
      { icon: 'logos:php', label: 'PHP' },
      { icon: 'logos:mongodb-icon', label: 'MongoDB' },
      { icon: 'logos:firebase', label: 'Firebase' },
      { icon: 'logos:supabase-icon', label: 'Supabase' },
      { icon: 'logos:python', label: 'Python' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      { icon: 'logos:git-icon', label: 'Git' },
      { icon: 'logos:github-icon', label: 'GitHub' },
      { icon: 'logos:visual-studio-code', label: 'VS Code' },
      { icon: 'logos:netlify', label: 'Netlify' },
      { icon: 'simple-icons:greensock', label: 'GSAP', color: '#88CE02' },
      { icon: 'simple-icons:threejs', label: 'Three.js', color: 'var(--color-foreground)' },
      { icon: 'simple-icons:animejs', label: 'Anime.js', color: '#FF1461' },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    items: [
      { icon: 'logos:figma', label: 'Figma' },
      { text: 'R', className: 'skill-card__icon--responsive', label: 'Responsive Design' },
      { text: 'UX', className: 'skill-card__icon--uiux', label: 'UI / UX' },
    ],
  },
];

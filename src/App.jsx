import { useState } from 'react';
import { Preloader } from './components/Preloader';
import { GLBackground } from './components/BackgroundScene/BackgroundScene';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { TypingChallenge } from './components/TypingChallenge';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { activeId, scrolled, showBackToTop } = useScrollSpy();
  useLenis();

  return (
    <>
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}

      <GLBackground />

      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <Navbar activeId={activeId} scrolled={scrolled} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero ready={preloaderDone} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <TypingChallenge />
        <Contact />
      </main>

      <Footer />
      <BackToTop visible={showBackToTop} />
    </>
  );
}

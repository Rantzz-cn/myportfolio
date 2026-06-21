import { useState } from 'react';
import { Button } from './Button';
import resumeUrl from '../assets/resume/TeraldicoRanier_Resume.pdf?url';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar({ activeId, scrolled, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }

  function closeMenu() {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }

  function isActive(href) {
    return href.replace('#', '') === activeId;
  }

  return (
    <header className="navbar" style={{ boxShadow: scrolled ? 'var(--shadow-sm)' : 'none' }}>
      <div className="container navbar__inner">
        <a href="#hero" className="navbar__logo">
          Ranier<span>.dev</span>
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link${isActive(link.href) ? ' is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <Button href={resumeUrl} variant="outline" target="_blank" rel="noopener noreferrer">
            Resume
          </Button>
        </nav>

        <div className="navbar__right">
          <div className="theme-switch">
            <input
              id="checkbox"
              type="checkbox"
              checked={theme === 'light'}
              onChange={(e) => onToggleTheme(e.target.checked)}
            />
            <label className="switch" htmlFor="checkbox" data-tooltip="Toggle Theme">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="slider">
                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
              </svg>
            </label>
          </div>

          <button
            className={`navbar__toggle${menuOpen ? ' is-active' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            data-tooltip="Menu"
            onClick={toggleMenu}
          >
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`navbar__mobile-menu${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="navbar__mobile-link" onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a
          href={resumeUrl}
          className="navbar__mobile-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          Resume
        </a>
      </nav>
    </header>
  );
}

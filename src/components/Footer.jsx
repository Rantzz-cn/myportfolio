import { socialLinks } from '../data/contact';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          &copy; <span>{new Date().getFullYear()}</span> Ranier Teraldico. All rights reserved.
        </p>
        <div className="footer__socials">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              className="footer__social-link"
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${link.label} profile`}
              data-tooltip={link.label}
            >
              <iconify-icon icon={link.icon} width="18"></iconify-icon>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

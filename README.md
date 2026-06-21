# Ranier Teraldico — Portfolio (React + Vite)

React/Vite port of the original vanilla HTML/CSS/JS portfolio. Visual design and copy are unchanged — this is a structural migration.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Deploy to Netlify the same way as before: build command `npm run build`, publish directory `dist`.

## Stack

- **React 18 + Vite**
- **react-three-fiber** — hero background scene (was raw Three.js r128)
- **Anime.js** — kept as-is for entrance/hover/reveal animations, wrapped in hooks
- **Lenis** — smooth scroll (npm package `lenis`, the renamed successor to `@studio-freight/lenis`)
- **iconify-icon** — kept as the CDN web component, used directly as `<iconify-icon>` in JSX

## Structure

```
src/
  components/        one file per section, plus shared Button + BackgroundScene/
  data/              projects, experience, skills, certifications, contact — plain arrays
  hooks/             useTheme, useScrollSpy, useScrollReveal, useMagnetic, useLenis
  styles/            your original 6 CSS files, untouched, imported in cascade order via index.css
  assets/            images + resume PDF, imported as modules so Vite hashes/optimizes them
```

## Notable changes from the original

- **Contact form**: the original had two competing submit handlers (`main.js`'s fake `setTimeout` version and `contact.js`'s real Formspree `fetch` version) both firing on submit. Kept only the real one.
- **Mobile menu background**: removed the `!important` inline-style override in `<head>` — `components.css` already sets the same `#0d0d0f` background correctly, the override was redundant.
- **Dead code dropped**: `initHeroParticles()` and the mobile-menu close button in the old `animations.js`/`navigation.js` referenced elements (`.hero__particles`, `#mobile-close-btn`) that don't exist anywhere in the HTML.
- **`_next` hidden field** removed from the contact form — it pointed at a placeholder `yourdomain.com/thanks.html` and isn't used by the AJAX submit path anyway.
- **Unused asset**: `profile-white.jpg` exists in `assets/images` but was never actually wired to the light theme (the original's `updateProfileImage()` returned the same image for both themes). It's copied into `src/assets/images` but not imported anywhere — let me know if you want it wired up for light mode.

## Known follow-ups

- The production bundle is ~1MB (mostly `three`/`@react-three/fiber`). Worth lazy-loading `GLBackground` with `React.lazy()` if initial load time matters.
- No ESLint config included yet — add one if you want lint-on-save.

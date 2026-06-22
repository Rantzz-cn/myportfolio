# lunico – Personal Portfolio (React + Vite)

A stunning, responsive, dark‑mode aware portfolio built with **React**, **Vite**, **Three.js**, and **Anime.js**. The project includes a custom WebGL background, preloader, hero section with animated particles, and a fully styled component library.

---

## ✨ Features

- **Dark / Light mode** – CSS variables switch themes via `html[data-theme="light"]` and `html[data-theme="dark"]`.
- **WebGL background** – React‑Three‑Fiber scene with star field, hero particle cloud, and subtle aurora effects.
- **Preloader** – Animated percentage counter that fades out before the main content appears.
- **Responsive layout** – Fluid grid system, mobile‑friendly breakpoints, and graceful fallback for reduced‑motion users.
- **Modern UI** – Custom buttons, smooth hover shines, and glass‑like cards.
- **Fully SEO‑ready** – Semantic HTML, appropriate meta tags, and Google Fonts (Inter, Space Grotesk, JetBrains Mono).
- **One‑click deployment** – Configured for Netlify (and works on Vercel, Cloudflare Pages, etc.).

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React (v18) |
| Bundler | Vite |
| 3D / Canvas | three.js + @react-three/fiber |
| Animations | anime.js |
| Styling | CSS (variables, components, sections, layout) |
| Icons | Iconify |
| Version control | Git + GitHub |
| Deployment | Netlify (free tier) |

---

## 🚀 Getting Started (local)

```bash
# Clone the repository (replace with your fork if needed)
git clone https://github.com/Rantzz-cn/lunico.git
cd lunico

# Install dependencies
npm ci   # or `npm install`

# Run the development server
npm run dev
```

Open `http://localhost:5173` in your browser. The site will automatically detect your OS preference for dark/light mode, but you can toggle it using the switch in the navbar.

---

## 📦 Build for Production

```bash
npm run build
```

The compiled static files are placed in the `dist/` folder, ready to be served by any static‑host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).

---

## 🏗️ Deploy to Netlify (recommended)

1. Sign in at https://netlify.com with your GitHub account.
2. Create a new site → **Import from Git** → select `Rantzz-cn/lunico`.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy site**.

Netlify will now build and host your portfolio automatically on every push to `main`.

---

## 🎨 Theme Switching

The theme is stored in a `data-theme` attribute on the `<html>` element. The light‑mode override rules use the selector `html[data-theme="light"]`. The toggle in the `Navbar` component updates this attribute, and the CSS variables defined in `variables.css` drive the color changes.

---

## 📚 Project Structure (high‑level)

```
src/
├─ components/          # React components (Navbar, Footer, Preloader, etc.)
│   └─ BackgroundScene/   # WebGL scene wrapper
├─ styles/              # CSS modules (variables, layout, components, sections, responsive)
├─ App.jsx              # Main layout and routing
├─ main.jsx             # Entry point, imports global styles
└─ index.html            # HTML template with Google Fonts & meta tags
```

---

## 📄 License

MIT – feel free to fork, remix, and use it for your own portfolio.

---

## 🙋‍♂️ Author

**Ranier Teraldico** – UI/UX designer & front‑end developer.

Follow me on:
- GitHub: https://github.com/Rantzz-cn
- LinkedIn: https://linkedin.com/in/ranier-teraldico

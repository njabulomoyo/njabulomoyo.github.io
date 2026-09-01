# njabulomoyo.github.io

Personal portfolio for Njabulo Moyo — a single-page static site hosted on GitHub Pages.

**Live:** https://njabulomoyo.github.io/

## Structure

```
.
├── index.html            # the whole page (must stay at repo root for GitHub Pages)
├── favicon.svg
└── assets/
    ├── css/styles.css     # design tokens, light/dark themes, layout
    ├── js/app.js          # theme toggle, mobile nav, scroll reveal, active-nav
    └── img/               # portrait + project images
```

## Local preview

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Development notes

- **Themes:** `:root` holds the light palette; dark is applied via
  `prefers-color-scheme` or a `data-theme` attribute set by the toggle
  (persisted in `localStorage`).
- **Icons** are an inline SVG sprite at the top of `<body>` — no icon font.
- **Résumé** button links to a live Google Docs PDF export.

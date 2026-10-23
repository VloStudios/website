# personal site

Read-only license (see LICENSE). Plain HTML/CSS/JS. No build step, no dependencies.

## customize

Edit **`site.config.js`**. Everything marked `REPLACE ME` is a placeholder (name, handle, intro, about, projects, contact). Sample projects are fake, replace or delete them. Empty `now`, `projects`, or contact fields hide themselves.

Also update by hand: the `<title>` and meta tags in `index.html` (fallbacks for crawlers that don't run JS) and the colors in `css/style.css` (`:root`).

## run locally

    python3 -m http.server 8000

then open http://localhost:8000

## deploy to GitHub Pages

1. Push this folder to a GitHub repo on branch `main`.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` and publishes. Check the Actions tab; the URL shows in the deploy job.
4. Custom domain: add it under Settings → Pages, and the `CNAME` file (vlostudios.dev) is already in place.

All paths are relative, so it works at `user.github.io/repo-name/` and at a custom domain. The 404 page works out of the box on both.

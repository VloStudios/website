# VloStudios Website (Sakura Iced Tea Remake)

This repository now contains a full static-first remake of the site with a brand-new structure and visual direction:

- Sakura + iced-tea themed landing page
- Animated "raining iced tea" effect
- Mini CV section powered by live GitHub profile/repo data for `VloStudios`
- Custom themed `404.html` for GitHub Pages

## Project layout

- `/index.html` — primary site entrypoint
- `/css/style.css` — complete redesign styles
- `/js/main.js` — animation + GitHub data loading + CV/repo rendering
- `/404.html` — custom Sakura iced-tea 404 page
- `/app.py` — optional local Flask serving

## Run locally

```bash
pip install -r /home/runner/work/website/website/requirements.txt
python /home/runner/work/website/website/app.py
```

Then open `http://localhost:5001`.

## GitHub Pages compatibility

GitHub Pages deploys from the repository root in this repo's workflow, so published assets (including `404.html`, `CNAME`, and `.nojekyll`) are kept at the root.

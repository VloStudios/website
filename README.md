# Vlo Studios Site

A developer portfolio site for Vlo, featuring:
- Projects synced from GitHub (`VloStudios`)
- Matrix-style background
- Lo‑fi music player with selectable tracks
- Cherry Clicker game (Japanese cherry vibes)
- Chill, dark, hacker aesthetic
- **Scrollable content** (fixed matrix background with scrolling foreground)

## Setup

1. Clone or copy this directory.
2. Create a virtual environment (optional):
   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask app:
   ```bash
   python app.py
   ```
5. Visit `http://localhost:5001` in your browser.

## Features

- **Projects Tab**: Fetches public repositories from the GitHub user `VloStudios` and displays them as cards.
- **Matrix Background**: Animated green code rain.
- **Lo‑fi Player**: Choose from a few free lo‑fi tracks and play/pause.
- **Cherry Clicker**: Japanese cherry‑themed clicker game with auto‑clickers and petal animations.
- **Ice‑tea Mention**: Tagline references Vlo’s love for ice tea.
- **Scrolling**: The content scrolls while the matrix background stays fixed.

## Customization

- Edit `static/js/lofi.js` to add or change lo‑fi track URLs.
- Adjust styling in `static/css/style.css`.
- Modify the Flask app in `app.py` if you need different GitHub user or additional data.

## Deployment

The site is configured to deploy automatically to GitHub Pages via the GitHub Actions workflow (`.github/workflows/deploy.yml`). Upon each push to the `main` branch, the workflow builds and deploys the site.

To deploy manually:
1. Push your changes to the `main` branch.
2. Go to the **Actions** tab in your repository to monitor the deployment.
3. Once completed, your site will be available at `https://<your-username>.github.io/<repo-name>/` (or custom domain if configured).

## Custom Domain

A `CNAME` file is included with the value `vlostudios.dev`. Ensure you configure your DNS settings accordingly.

Enjoy the chill vibe and happy coding!
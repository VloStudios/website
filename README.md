# Vlo Studios Site

A developer portfolio site for Vlo, featuring:
- Projects synced from GitHub (`VloStudios`)
- Sakura-themed CV presentation
- Iced-tea-inspired design accents
- Background ambient music toggle
- **Scrollable card layout** with GitHub-powered profile/repo data

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

- **CV Snapshot**: Pulls profile details from `https://api.github.com/users/VloStudios`.
- **Projects Section**: Fetches public repositories and displays the most recently updated.
- **Sakura UI**: Soft pink card-based visuals with blossom-inspired background elements.
- **Ambient Background Music**: Browser-based synth music with play/pause controls.
- **Iced Tea Theme**: Dedicated section and palette accents for a calm tea vibe.

## Customization

- Edit `static/js/main.js` to change profile username or CV rendering behavior.
- Adjust styling in `static/css/style.css`.
- Modify the Flask app in `app.py` if you want server-rendered data endpoints.

## Deployment

The site is configured to deploy automatically to GitHub Pages via the GitHub Actions workflow (`.github/workflows/deploy.yml`). Upon each push to the `main` branch, the workflow builds and deploys the site.

To deploy manually:
1. Push your changes to the `main` branch.
2. Go to the **Actions** tab in your repository to monitor the deployment.
3. Once completed, your site will be available at `https://<your-username>.github.io/<repo-name>/` (or custom domain if configured).

## Custom Domain

A `CNAME` file is included with the value `vlostudios.dev`. Ensure you configure your DNS settings accordingly.

Enjoy the chill vibe and happy coding!
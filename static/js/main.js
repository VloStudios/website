// Main script: fetch projects and render
document.addEventListener('DOMContentLoaded', async () => {
    const projectsGrid = document.getElementById('projects-list');

    try {
        const response = await fetch('https://api.github.com/users/VloStudios/repos?per_page=100');
        const repos = await response.json();

        // Filter out forks and sort by updated date
        const filtered = repos.filter(repo => !repo.fork);
        filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        if (filtered.length === 0) {
            projectsGrid.innerHTML = '<p>No projects found.</p>';
            return;
        }

        filtered.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';

            const name = document.createElement('h3');
            const link = document.createElement('a');
            link.href = repo.html_url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.textContent = repo.name;
            name.appendChild(link);
            card.appendChild(name);

            if (repo.description) {
                const desc = document.createElement('p');
                desc.textContent = repo.description;
                card.appendChild(desc);
            }

            const meta = document.createElement('div');
            meta.className = 'meta';

            const lang = document.createElement('span');
            lang.textContent = repo.language || 'Unknown';
            meta.appendChild(lang);

            const stars = document.createElement('span');
            stars.textContent = `⭐ ${repo.stargazers_count}`;
            meta.appendChild(stars);

            const updated = document.createElement('span');
            const date = new Date(repo.updated_at).toLocaleDateString();
            updated.textContent = `Updated: ${date}`;
            meta.appendChild(updated);

            card.appendChild(meta);
            projectsGrid.appendChild(card);
        });
    } catch (err) {
        console.error('Failed to fetch projects:', err);
        projectsGrid.innerHTML = '<p>Error loading projects.</p>';
    }
});
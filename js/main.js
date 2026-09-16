const user = "VloStudios";

const ui = {
  displayName: document.getElementById("display-name"),
  tagline: document.getElementById("tagline"),
  bio: document.getElementById("bio"),
  username: document.getElementById("username"),
  location: document.getElementById("location"),
  followers: document.getElementById("followers"),
  reposCount: document.getElementById("repos-count"),
  topLanguages: document.getElementById("top-languages"),
  updated: document.getElementById("updated"),
  repoGrid: document.getElementById("repo-grid"),
  rain: document.getElementById("rain")
};

function esc(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(iso) {
  if (!iso) return "Unknown";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function makeRain() {
  const symbols = ["🧋", "🌸", "💧"];
  const count = 36;

  for (let i = 0; i < count; i += 1) {
    const d = document.createElement("span");
    d.className = "drop";
    d.textContent = symbols[i % symbols.length];
    d.style.left = `${Math.random() * 100}%`;
    d.style.animationDuration = `${6 + Math.random() * 7}s`;
    d.style.animationDelay = `${Math.random() * -12}s`;
    ui.rain.appendChild(d);
  }
}

function topLanguagesFromRepos(repos) {
  const tally = {};
  repos.forEach((r) => {
    if (r?.fork || !r?.language) return;
    tally[r.language] = (tally[r.language] || 0) + 1;
  });

  return Object.entries(tally)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name)
    .join(", ");
}

function renderRepos(repos) {
  const cards = repos
    .filter((r) => !r.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 6)
    .map((repo) => {
      const name = esc(repo.name);
      const link = esc(repo.html_url);
      const description = esc(repo.description || "No description yet.");
      const language = esc(repo.language || "Mixed");
      return `
        <article class="repo-card">
          <h3><a href="${link}" target="_blank" rel="noreferrer">${name}</a></h3>
          <p>${description}</p>
          <p class="meta">${language} · ★ ${repo.stargazers_count || 0} · Updated ${formatDate(repo.updated_at)}</p>
        </article>
      `;
    });

  if (!cards.length) {
    ui.repoGrid.innerHTML = '<p class="muted">No public repositories available right now.</p>';
    return;
  }

  ui.repoGrid.innerHTML = cards.join("");
}

async function loadData() {
  let profile = null;
  let repos = [];

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error("GitHub API unavailable");
    }

    profile = await profileRes.json();
    repos = await reposRes.json();
  } catch {
    ui.bio.textContent = "Could not fetch GitHub live data right now, but the tea vibes remain immaculate.";
    ui.username.textContent = user;
    ui.location.textContent = "Internet";
    ui.followers.textContent = "-";
    ui.reposCount.textContent = "-";
    ui.topLanguages.textContent = "-";
    ui.updated.textContent = "Unavailable";
    ui.repoGrid.innerHTML = '<p class="muted">Unable to load repositories currently.</p>';
    return;
  }

  ui.displayName.textContent = profile.name || profile.login || user;
  ui.tagline.textContent = profile.bio || "Builder of internet things, brewed cold and served with Sakura.";
  ui.bio.textContent = `${profile.name || profile.login || user} is a GitHub creator focused on shipping projects and experiments.`;
  ui.username.textContent = profile.login || user;
  ui.location.textContent = profile.location || "Online";
  ui.followers.textContent = String(profile.followers ?? "-");
  ui.reposCount.textContent = String(profile.public_repos ?? "-");
  ui.topLanguages.textContent = topLanguagesFromRepos(repos) || "Mixed";
  ui.updated.textContent = formatDate(profile.updated_at);

  renderRepos(repos);
}

makeRain();
loadData();

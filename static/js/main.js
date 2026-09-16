const username = "VloStudios";

const el = {
    name: document.getElementById("profile-name"),
    bio: document.getElementById("profile-bio"),
    avatar: document.getElementById("avatar"),
    followers: document.getElementById("followers"),
    following: document.getElementById("following"),
    publicRepos: document.getElementById("public-repos"),
    location: document.getElementById("location"),
    profileUpdated: document.getElementById("profile-updated"),
    repoGrid: document.getElementById("repo-grid"),
    musicToggle: document.getElementById("music-toggle"),
    musicStatus: document.getElementById("music-status")
};

let audioContext;
let masterGain;
let oscillators = [];
let lfo;

function prettyDate(isoDate) {
    if (!isoDate) return "Unknown";
    return new Date(isoDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

async function loadProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("Failed to load profile");
        const profile = await response.json();

        el.name.textContent = profile.name || profile.login || username;
        el.bio.textContent = profile.bio || "Builder, creator, and calm code enthusiast.";
        el.avatar.src = profile.avatar_url || el.avatar.src;
        el.avatar.alt = `${profile.login || username} avatar`;
        el.followers.textContent = profile.followers ?? "-";
        el.following.textContent = profile.following ?? "-";
        el.publicRepos.textContent = profile.public_repos ?? "-";
        el.location.textContent = profile.location || "Online";
        el.profileUpdated.textContent = `Profile updated: ${prettyDate(profile.updated_at)}`;
    } catch {
        el.profileUpdated.textContent = "Could not load profile from GitHub right now.";
    }
}

function renderRepos(repos) {
    const visible = repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);

    if (visible.length === 0) {
        el.repoGrid.innerHTML = '<p class="small">No public repositories to show yet.</p>';
        return;
    }

    el.repoGrid.innerHTML = visible.map((repo) => {
        const name = escapeHtml(repo.name);
        const description = escapeHtml(repo.description || "No description provided.");
        const language = escapeHtml(repo.language || "Mixed");
        const stars = Number(repo.stargazers_count || 0);
        const url = escapeHtml(repo.html_url);
        const updated = prettyDate(repo.updated_at);

        return `
            <article class="repo-card">
                <h3><a href="${url}" target="_blank" rel="noreferrer">${name}</a></h3>
                <p>${description}</p>
                <p class="repo-meta">${language} • ★ ${stars} • Updated ${updated}</p>
            </article>
        `;
    }).join("");
}

async function loadRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!response.ok) throw new Error("Failed to load repos");
        const repos = await response.json();
        renderRepos(repos);
    } catch {
        el.repoGrid.innerHTML = '<p class="small">Could not load repositories right now.</p>';
    }
}

function setMusicUI(isPlaying) {
    el.musicToggle.textContent = isPlaying ? "⏸ Pause Music" : "▶ Play Music";
    el.musicStatus.textContent = isPlaying ? "Playing" : "Stopped";
}

function stopAmbient() {
    oscillators.forEach((osc) => {
        try {
            osc.stop();
        } catch {
            // no-op
        }
    });
    oscillators = [];

    if (lfo) {
        try {
            lfo.stop();
        } catch {
            // no-op
        }
        lfo.disconnect();
        lfo = null;
    }

    if (masterGain) {
        masterGain.disconnect();
        masterGain = null;
    }
}

function startAmbient() {
    audioContext = audioContext || new window.AudioContext();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.04;
    masterGain.connect(audioContext.destination);

    const notes = [220, 261.63, 329.63];
    oscillators = notes.map((frequency, index) => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        osc.type = index === 0 ? "sine" : "triangle";
        osc.frequency.value = frequency;
        oscGain.gain.value = index === 0 ? 0.5 : 0.22;
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
    });

    lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.18;
    lfoGain.gain.value = 9;
    lfo.connect(lfoGain);
    lfoGain.connect(oscillators[1].frequency);
    lfo.start();
}

function setupMusic() {
    let isPlaying = false;
    setMusicUI(false);

    el.musicToggle.addEventListener("click", async () => {
        if (!isPlaying) {
            try {
                if (audioContext && audioContext.state === "suspended") {
                    await audioContext.resume();
                }
                startAmbient();
                isPlaying = true;
                setMusicUI(true);
            } catch {
                el.musicStatus.textContent = "Audio blocked by browser.";
            }
            return;
        }

        stopAmbient();
        isPlaying = false;
        setMusicUI(false);
    });
}

loadProfile();
loadRepos();
setupMusic();

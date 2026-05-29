import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Github, GitlabIcon, ExternalLink, Star, GitFork, Archive, Code2, CupSoda } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
  updated_at: string;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vlo — Pop Vlad-Andrei · Hobby Developer" },
      { name: "description", content: "Portfolio of Vlo (Pop Vlad-Andrei) — Python enthusiast, game tinkerer, ice tea lover. Projects synced live from GitHub." },
      { property: "og:title", content: "Vlo — Pop Vlad-Andrei" },
      { property: "og:description", content: "Hobby developer who loves Python and ice tea. See my GitHub projects." },
    ],
  }),
  component: Index,
});

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5.5 11.2a1.6 1.6 0 0 1-.1.6 3.8 3.8 0 0 1 .1.9c0 2.3-2.9 4.2-6.5 4.2s-6.5-1.9-6.5-4.2a3.8 3.8 0 0 1 .1-.9 1.6 1.6 0 1 1 2-2.4 7.9 7.9 0 0 1 4-1.1l.8-3.6a.4.4 0 0 1 .5-.3l2.6.6a1.2 1.2 0 1 1-.1.6l-2.3-.5-.7 3.2a7.9 7.9 0 0 1 4 1.1 1.6 1.6 0 0 1 2.1 1.8zM9 14a1 1 0 1 0 1-1 1 1 0 0 0-1 1zm6 0a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm-.5 2.4a.4.4 0 0 0-.6 0 3 3 0 0 1-3.8 0 .4.4 0 1 0-.6.6 3.8 3.8 0 0 0 5 0 .4.4 0 0 0 0-.6z" />
    </svg>
  );
}

async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch("https://api.github.com/users/VloStudios/repos?per_page=100&sort=updated", {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error("Failed to load repos");
  const data: Repo[] = await res.json();
  return data.filter((r) => !r.fork);
}

const langColor: Record<string, string> = {
  Python: "oklch(0.65 0.18 160)",
  JavaScript: "oklch(0.85 0.18 90)",
  TypeScript: "oklch(0.6 0.15 230)",
  HTML: "oklch(0.7 0.18 30)",
  CSS: "oklch(0.6 0.15 280)",
  Java: "oklch(0.7 0.15 50)",
  Kotlin: "oklch(0.65 0.2 300)",
  C: "oklch(0.55 0.05 250)",
  "C++": "oklch(0.6 0.12 340)",
  Shell: "oklch(0.55 0.05 140)",
};

function Index() {
  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ["vlo-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-mono text-sm tracking-tight text-foreground">
          <span className="text-primary">{">"}</span> vlo.py
        </div>
        <div className="flex items-center gap-5">
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition">About</a>
          <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition">Projects</a>
          <a href="#socials" className="text-sm text-muted-foreground hover:text-foreground transition">Socials</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="flex items-center gap-2 text-sm text-primary font-mono mb-6">
          <CupSoda className="h-4 w-4" /> brewing ideas with ice tea
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Hi, I'm <span style={{ background: "var(--gradient-amber)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Vlo</span>.
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          aka <span className="text-foreground font-medium">Pop Vlad-Andrei</span> — hobby developer, Python fan, serial over-scoper.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90" style={{ boxShadow: "var(--shadow-glow)" }}>
            <Code2 className="h-4 w-4" /> See my projects
          </a>
          <a href="https://github.com/VloStudios" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">About</h2>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>Hi, I'm Vlo, a hobby developer and someone who genuinely loves technology and IT. I enjoy building projects, experimenting with ideas, and learning new things by actually creating them. Most of the time, I work with <span className="text-primary font-medium">Python</span>, and I like making games, apps, and random tech experiments that somehow become bigger projects than I originally planned 💀</p>
          <p>I'm interested in game development, especially with tools like Pygame, Kivy, and Android Studio. I also enjoy exploring AI, trying out new technologies, and thinking of creative ideas for apps and software. Sometimes I dream way too big — like making operating systems, browsers, or tools that transform one type of project into another.</p>
          <p>Outside of coding, I enjoy gaming, especially Minecraft, FIFA, Brawl Stars, and Nintendo Switch games. I also make music sometimes and like creative storytelling, fun ideas, and experimenting with tech.</p>
          <p>I care a lot about creativity and building cool things, and I enjoy exploring just how far an idea can go — even if it starts as something small and randomly turns into a huge project for absolutely no reason 😭</p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Projects</h2>
            <p className="mt-2 text-muted-foreground">Live from <span className="font-mono text-primary">@VloStudios</span> on GitHub</p>
          </div>
        </div>

        {isLoading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 rounded-xl border border-border bg-card animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-destructive-foreground">
            Couldn't fetch repos from GitHub right now. Try again later.
          </div>
        )}

        {repos && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition hover:border-primary/60 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition truncate">
                    {repo.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {repo.archived ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      <Archive className="h-3 w-3" /> Public archive
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Public
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
                  {repo.description || "No description provided."}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[repo.language] || "oklch(0.6 0.05 250)" }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" />{repo.stargazers_count}</span>
                  <span className="inline-flex items-center gap-1"><GitFork className="h-3.5 w-3.5" />{repo.forks_count}</span>
                </div>
              </a>
            ))}
            {repos.length === 0 && (
              <p className="text-muted-foreground">No public repositories yet.</p>
            )}
          </div>
        )}
      </section>

      {/* SOCIALS */}
      <section id="socials" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Find me online</h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://reddit.com/u/VloTheDev" target="_blank" rel="noreferrer" aria-label="Reddit" className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card transition hover:border-primary/60 hover:-translate-y-1">
            <RedditIcon className="h-7 w-7 text-muted-foreground group-hover:text-primary transition" />
          </a>
          <a href="https://github.com/VloStudios" target="_blank" rel="noreferrer" aria-label="GitHub" className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card transition hover:border-primary/60 hover:-translate-y-1">
            <Github className="h-7 w-7 text-muted-foreground group-hover:text-primary transition" />
          </a>
          <a href="https://gitlab.com/VloStudios" target="_blank" rel="noreferrer" aria-label="GitLab" className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card transition hover:border-primary/60 hover:-translate-y-1">
            <GitlabIcon className="h-7 w-7 text-muted-foreground group-hover:text-primary transition" />
          </a>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 border-t border-border mt-10">
        <p className="text-sm text-muted-foreground font-mono">
          <span className="text-primary">$</span> made with python energy & ice tea ·  © {new Date().getFullYear()} Vlo
        </p>
      </footer>
    </main>
  );
}

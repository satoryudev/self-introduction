import { TerminalCard } from "./TerminalCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cacheLife, cacheTag } from "next/cache";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "";

const LANG_COLOR: Record<string, string> = {
  "C++": "text-[#f34b7d]",
  Python: "text-[#3572A5]",
  TypeScript: "text-[#2b7489]",
  JavaScript: "text-[#f1e05a]",
  Rust: "text-[#dea584]",
  Go: "text-[#00ADD8]",
  Java: "text-[#b07219]",
};

interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  topics: string[];
}

async function fetchRepos(): Promise<Repo[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("github");

  if (!GITHUB_USERNAME) return [];

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`,
      { headers }
    );

    if (!res.ok) return [];

    const raw = (await res.json()) as {
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      updated_at: string;
      topics: string[];
    }[];

    return raw.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      updatedAt: r.updated_at,
      topics: r.topics ?? [],
    }));
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  return dateStr.slice(0, 10); // YYYY-MM-DD
}

export async function GitHubSection() {
  const repos = await fetchRepos();
  const hasData = repos.length > 0;

  return (
    <section className="px-4 py-16 max-w-3xl mx-auto w-full">
      <TerminalCard title="~ $ git log --oneline">
        <div className="mb-4 text-xs text-muted-foreground">
          <span className="text-primary">$</span> gh repo list{" "}
          {GITHUB_USERNAME || "<GITHUB_USERNAME>"} --limit 6
          <br />
          {hasData ? (
            <span className="text-[#27c93f]">
              ✓ {repos.length} repositories fetched
            </span>
          ) : (
            <span className="text-[#ffbd2e]">
              ⚠ リポジトリを取得できません — GITHUB_USERNAME を設定してください
            </span>
          )}
        </div>

        {hasData ? (
          <div className="space-y-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md border border-border bg-background/50 p-3 hover:border-primary/50 hover:bg-card transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-muted-foreground text-xs shrink-0">
                      {GITHUB_USERNAME}/
                    </span>
                    <span className="text-primary font-semibold text-sm truncate group-hover:underline">
                      {repo.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDate(repo.updatedAt)}
                  </span>
                </div>

                {repo.description && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  {repo.language && (
                    <span className={LANG_COLOR[repo.language] ?? "text-muted-foreground"}>
                      ● {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  {repo.forks > 0 && <span>⑂ {repo.forks}</span>}
                </div>

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {repo.topics.slice(0, 4).map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 font-mono bg-secondary text-muted-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 rounded-md" />
            ))}
          </div>
        )}

        <div className="mt-4 text-xs text-muted-foreground">
          <span className="text-primary">source:</span> GitHub API · api.github.com
        </div>
      </TerminalCard>
    </section>
  );
}

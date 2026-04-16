import { TerminalCard } from "./TerminalCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cacheLife, cacheTag } from "next/cache";

const USERNAME = process.env.ATCODER_USERNAME ?? "";

interface AtCoderData {
  acCount: number | null;
  rating: number | null;
  contestCount: number;
}

function getRatingColor(rating: number): string {
  if (rating >= 2800) return "text-[#ff0000]";
  if (rating >= 2400) return "text-[#ff8000]";
  if (rating >= 2000) return "text-[#c0c000]";
  if (rating >= 1600) return "text-[#00c0c0]";
  if (rating >= 1200) return "text-[#0000ff]";
  if (rating >= 800) return "text-[#00c000]";
  if (rating >= 400) return "text-[#804000]";
  return "text-[#808080]";
}

function getRatingLabel(rating: number): string {
  if (rating >= 2800) return "Red";
  if (rating >= 2400) return "Orange";
  if (rating >= 2000) return "Yellow";
  if (rating >= 1600) return "Teal";
  if (rating >= 1200) return "Blue";
  if (rating >= 800) return "Green";
  if (rating >= 400) return "Brown";
  return "Gray";
}

async function fetchAtCoderData(): Promise<AtCoderData> {
  "use cache";
  cacheLife("hours");
  cacheTag("atcoder");

  if (!USERNAME) {
    return { acCount: null, rating: null, contestCount: 0 };
  }

  try {
    const [acRes, historyRes] = await Promise.all([
      fetch(
        `https://kenkoooo.com/atcoder/atcoder-api/v3/user/accepted_count?user=${USERNAME}`
      ),
      fetch(`https://atcoder.jp/users/${USERNAME}/history/json`),
    ]);

    const acCount = acRes.ok
      ? ((await acRes.json()) as { accepted_count: number }).accepted_count
      : null;

    const history = historyRes.ok
      ? (await historyRes.json()) as { NewRating: number }[]
      : [];

    return {
      acCount,
      rating: history.length > 0 ? history[history.length - 1].NewRating : null,
      contestCount: history.length,
    };
  } catch {
    return { acCount: null, rating: null, contestCount: 0 };
  }
}

export async function AtCoderSection() {
  const data = await fetchAtCoderData();
  const hasData = data.rating !== null || data.acCount !== null;

  return (
    <section className="px-4 py-16 max-w-3xl mx-auto w-full">
      <TerminalCard title="~ $ ./fetch atcoder">
        <div className="mb-4 text-xs text-muted-foreground">
          <span className="text-primary">$</span> ./fetch_atcoder_stats --user{" "}
          {USERNAME || "<ATCODER_USERNAME>"}
          <br />
          {hasData ? (
            <span className="text-[#27c93f]">✓ データ取得完了</span>
          ) : (
            <span className="text-[#ffbd2e]">⚠ データ取得失敗 — env を確認してください</span>
          )}
        </div>

        {hasData ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Rating */}
            <div className="rounded-md border border-border bg-background/50 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Rating</div>
              {data.rating !== null ? (
                <>
                  <div className={`text-3xl font-bold ${getRatingColor(data.rating)}`}>
                    {data.rating}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`mt-1 text-xs ${getRatingColor(data.rating)} border-current/30`}
                  >
                    {getRatingLabel(data.rating)}
                  </Badge>
                </>
              ) : (
                <div className="text-muted-foreground text-sm">—</div>
              )}
            </div>

            {/* AC Count */}
            <div className="rounded-md border border-border bg-background/50 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">AC 数</div>
              {data.acCount !== null ? (
                <div className="text-3xl font-bold text-primary">
                  {data.acCount.toLocaleString()}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">—</div>
              )}
              <div className="text-xs text-muted-foreground mt-1">problems solved</div>
            </div>

            {/* Contest Count */}
            <div className="rounded-md border border-border bg-background/50 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">参加コンテスト</div>
              <div className="text-3xl font-bold text-foreground">
                {data.contestCount}
              </div>
              <div className="text-xs text-muted-foreground mt-1">contests</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-24 rounded-md" />
            ))}
          </div>
        )}

        <div className="mt-4 text-xs text-muted-foreground">
          <span className="text-primary">source:</span> AtCoder Problems API · kenkoooo.com
        </div>
      </TerminalCard>
    </section>
  );
}

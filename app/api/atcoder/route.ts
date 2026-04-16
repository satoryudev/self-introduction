import { NextResponse } from "next/server";

const USERNAME = process.env.ATCODER_USERNAME ?? "tourist";

export async function GET() {
  try {
    const [acCountRes, ratingRes] = await Promise.all([
      fetch(
        `https://kenkoooo.com/atcoder/atcoder-api/v3/user/accepted_count?user=${USERNAME}`,
        { next: { revalidate: 3600 } }
      ),
      fetch(`https://atcoder.jp/users/${USERNAME}/history/json`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const acCount = acCountRes.ok
      ? ((await acCountRes.json()) as { accepted_count: number }).accepted_count
      : null;

    const history = ratingRes.ok
      ? (await ratingRes.json()) as { NewRating: number; Place: number; ContestScreenName: string }[]
      : [];

    const latestRating =
      history.length > 0 ? history[history.length - 1].NewRating : null;

    const contestCount = history.length;

    return NextResponse.json({
      username: USERNAME,
      acCount,
      rating: latestRating,
      contestCount,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch AtCoder data" }, { status: 500 });
  }
}

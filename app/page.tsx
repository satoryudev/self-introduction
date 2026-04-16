import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SkillSection } from "@/components/SkillSection";
import { ProjectSection } from "@/components/ProjectSection";
import { AISection } from "@/components/AISection";
import { AtCoderSection } from "@/components/AtCoderSection";
import { GitHubSection } from "@/components/GitHubSection";
import { Skeleton } from "@/components/ui/skeleton";

function SectionSkeleton() {
  return (
    <section className="px-4 py-16 max-w-3xl mx-auto w-full">
      <Skeleton className="h-64 rounded-md" />
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full">
        <HeroSection />
      </div>

      <div className="w-full max-w-3xl px-4">
        <div className="border-t border-border" />
      </div>

      <SkillSection />
      <ProjectSection />
      <AISection />

      <Suspense fallback={<SectionSkeleton />}>
        <AtCoderSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <GitHubSection />
      </Suspense>

      <footer className="w-full max-w-3xl px-4 py-10 mt-4">
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            <span className="text-primary">©</span> 2025 佐藤 琉惺 / Ryusei Sato
          </span>
          <span className="font-mono">Built with Next.js · Deployed on Vercel</span>
        </div>
      </footer>
    </main>
  );
}

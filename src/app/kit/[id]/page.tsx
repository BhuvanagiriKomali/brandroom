"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandKitView } from "@/components/BrandKitView";
import type { Session } from "@/lib/types";

export default function KitPage() {
  const params = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/session/${params.id}`)
      .then(async (res) => {
        if (!res.ok) {
          setMissing(true);
          return;
        }
        const data = (await res.json()) as { session: Session };
        setSession(data.session);
      })
      .catch(() => setMissing(true));
  }, [params.id]);

  function downloadJson() {
    if (!session) return;
    const blob = new Blob([JSON.stringify(session.kit, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brandroom-kit-${session.id.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadMarkdown() {
    if (!session) return;
    const k = session.kit;
    const md = `# Brandroom kit

**Tagline:** ${k.tagline}

## Audience
${k.audience}

## Problem
${k.problem}

## Constraints
${k.constraints}

## Position
- Category: ${k.category}
- Differentiator: ${k.differentiator}
- Value proposition: ${k.valueProposition}

## Personality
${k.personalityTraits.map((t) => `- ${t}`).join("\n")}

## Names
${k.nameIdeas.map((t) => `- ${t}`).join("\n")}

## Voice
${k.voice}

## Visual brief
- Logo: ${k.logoDirection}
- Type: ${k.typography}
- Imagery: ${k.imagery}
${k.colors.map((c) => `- ${c.name} ${c.hex} — ${c.use}`).join("\n")}

## Challenge
${k.challengeNotes}

## Launch
### ${k.launchHeadline}

${k.pitch}
`;
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brandroom-kit-${session.id.slice(0, 8)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (missing) {
    return (
      <main className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Kit not found</h1>
        <p className="mt-3 text-[var(--muted)]">
          Sessions live in this running server. Start a new interview — don&apos;t refresh away from a
          finished demo if you still need the kit.
        </p>
        <Link className="btn-primary mt-8 inline-flex" href="/interview">
          New interview
        </Link>
      </main>
    );
  }

  if (!session) {
    return <p className="px-6 py-20 text-center text-[var(--muted)]">Opening kit…</p>;
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto flex max-w-2xl items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--terracotta)]">
            Stage 06 · Deliver
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl">Brand kit</h1>
        </div>
        <div className="flex flex-col gap-2">
          <button className="btn-primary text-sm" onClick={downloadMarkdown} type="button">
            Export markdown
          </button>
          <button className="btn-ghost text-sm" onClick={downloadJson} type="button">
            Export JSON
          </button>
          <Link className="text-center text-sm text-[var(--muted)] underline" href="/interview">
            New interview
          </Link>
        </div>
      </div>
      <BrandKitView kit={session.kit} />
    </main>
  );
}

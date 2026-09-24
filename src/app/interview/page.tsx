"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StageRail } from "@/components/StageRail";
import { STAGE_META } from "@/lib/stages";
import type { Session } from "@/lib/types";

export default function InterviewPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [usedDemo, setUsedDemo] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await fetch("/api/session", { method: "POST" });
      const data = (await response.json()) as { session: Session; usedDemo: boolean };
      if (!cancelled) {
        setSession(data.session);
        setUsedDemo(data.usedDemo);
      }
    })().catch(() => setError("Could not start a session."));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.messages.length, busy]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!session || !draft.trim() || busy) return;
    const message = draft.trim();
    setDraft("");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, message }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "The interview stalled. Try again.");
        setDraft(message);
        return;
      }
      setSession(data.session);
      setUsedDemo(data.usedDemo);
    } catch {
      setError("Network error — check that the server is running.");
      setDraft(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-full flex-1 lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-[var(--line)] bg-[var(--paper-2)] p-5 lg:block">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl">
          Brandroom
        </Link>
        <p className="mt-1 mb-6 text-xs text-[var(--muted)]">Six-stage interview</p>
        {session ? (
          <StageRail current={session.stage} completed={session.completedStages} />
        ) : null}
      </aside>

      <div className="flex min-h-full flex-col">
        <header className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3 lg:px-8">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--muted)]">
              {session ? STAGE_META[session.stage].number : "—"} ·{" "}
              {session ? STAGE_META[session.stage].label : "Starting"}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {usedDemo
                ? "Workflow demo mode (add GEMINI_API_KEY for live AI)"
                : "Live Gemini interview"}
            </p>
          </div>
          {session?.delivered ? (
            <Link className="btn-primary text-sm" href={`/kit/${session.id}`}>
              Open brand kit
            </Link>
          ) : (
            <Link className="text-sm text-[var(--muted)] underline-offset-4 hover:underline" href="/">
              Exit
            </Link>
          )}
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 lg:px-8">
          {session?.messages.map((message, index) => (
            <div
              key={`${index}-${message.content.slice(0, 12)}`}
              className={message.role === "user" ? "ml-auto max-w-xl" : "max-w-2xl"}
            >
              <p className="mb-1 text-[10px] tracking-[0.16em] uppercase text-[var(--muted)]">
                {message.role === "user" ? "Founder" : "Brandroom"} · {message.stage}
              </p>
              <div
                className={
                  message.role === "user"
                    ? "rounded-2xl bg-[var(--ink)] px-4 py-3 text-[var(--paper)]"
                    : "font-[family-name:var(--font-display)] text-xl leading-snug"
                }
              >
                {message.content}
              </div>
            </div>
          ))}
          {busy ? (
            <p className="text-sm text-[var(--muted)]">Listening, then asking the next sharp question…</p>
          ) : null}
          <div ref={bottom} />
        </div>

        <form onSubmit={send} className="border-t border-[var(--line)] p-4 lg:p-6">
          {error ? <p className="mb-2 text-sm text-[var(--terracotta)]">{error}</p> : null}
          <div className="flex gap-3">
            <textarea
              className="min-h-[52px] flex-1 resize-none rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--terracotta)]"
              placeholder="Answer in your own words…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(e as unknown as React.FormEvent);
                }
              }}
            />
            <button className="btn-primary self-end" disabled={busy || !draft.trim()} type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

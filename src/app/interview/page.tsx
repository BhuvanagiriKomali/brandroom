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
      const data = (await response.json()) as {
        session: Session;
        usedDemo: boolean;
      };

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
        body: JSON.stringify({
          sessionId: session.id,
          message,
        }),
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

  const currentStage = session ? STAGE_META[session.stage] : null;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Top navigation */}
      <header className="border-b border-[var(--line)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/brandroom-logo.svg"
              alt="Brandroom logo"
              className="h-8 w-8"
            />

            <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
              brandroom
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {session?.delivered ? (
              <Link
                href={`/kit/${session.id}`}
                className="btn-primary text-sm"
              >
                Open brand kit
                <span className="ml-2">→</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              >
                Exit
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-[230px_1fr]">
        {/* Stage sidebar */}
        <aside className="hidden border-r border-[var(--line)] py-8 lg:block">
          <div className="sticky top-0 px-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
              Your brand journey
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Six stages. One conversation.
            </p>

            <div className="mt-8">
              {session ? (
                <StageRail
                  current={session.stage}
                  completed={session.completedStages}
                />
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div
                      key={step}
                      className="h-5 w-32 animate-pulse rounded bg-[var(--line)]"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Interview area */}
        <section className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col">
          {/* Stage header */}
          <div className="border-b border-[var(--line)] px-5 py-5 sm:px-8">
            <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
                    {currentStage?.number ?? "—"}
                  </span>

                  <span className="text-[var(--line)]">/</span>

                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                    {currentStage?.label ?? "Starting"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  {usedDemo
                    ? "Demo mode · add GEMINI_API_KEY for live AI"
                    : "Live Gemini interview"}
                </p>
              </div>

              {currentStage ? (
                <div className="hidden max-w-xs text-right sm:block">
                  <p className="text-xs leading-5 text-[var(--muted)]">
                    {currentStage.goal}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
            <div className="mx-auto max-w-4xl space-y-8">
              {!session ? (
                <div className="py-20 text-center">
                  <div className="mx-auto mb-5 h-8 w-8 animate-pulse rounded-full bg-[var(--terracotta)]" />

                  <p className="font-[family-name:var(--font-display)] text-2xl">
                    Preparing your room…
                  </p>

                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Getting the first question ready.
                  </p>
                </div>
              ) : null}

              {session?.messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${index}-${message.content.slice(0, 12)}`}
                    className={
                      isUser
                        ? "ml-auto max-w-2xl"
                        : "max-w-3xl"
                    }
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={
                          isUser
                            ? "text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]"
                            : "text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--terracotta)]"
                        }
                      >
                        {isUser ? "You" : "Brandroom"}
                      </span>

                      <span className="text-[var(--line)]">·</span>

                      <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                        {message.stage}
                      </span>
                    </div>

                    {isUser ? (
                      <div className="rounded-[1.25rem] rounded-br-md bg-[var(--ink)] px-5 py-4 text-sm leading-7 text-[var(--paper)] shadow-sm">
                        {message.content}
                      </div>
                    ) : (
                      <div className="rounded-[1.5rem] rounded-tl-md border border-[var(--line)] bg-[var(--paper-2)] px-5 py-5 sm:px-6">
                        <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed sm:text-2xl">
                          {message.content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {busy ? (
                <div className="max-w-3xl">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--terracotta)]">
                      Brandroom
                    </span>
                  </div>

                  <div className="rounded-[1.5rem] rounded-tl-md border border-[var(--line)] bg-[var(--paper-2)] px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--terracotta)]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--terracotta)] [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--terracotta)] [animation-delay:300ms]" />
                      </span>

                      <span className="text-sm text-[var(--muted)]">
                        Thinking about your answer…
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              <div ref={bottom} />
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-[var(--line)] bg-[var(--paper)] px-5 py-5 sm:px-8 sm:py-6">
            <div className="mx-auto max-w-4xl">
              {error ? (
                <div className="mb-3 rounded-xl border border-[var(--terracotta)]/30 bg-[var(--paper-2)] px-4 py-3 text-sm text-[var(--terracotta)]">
                  {error}
                </div>
              ) : null}

              <form onSubmit={send}>
                <div className="relative overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[var(--paper-2)] transition-colors focus-within:border-[var(--terracotta)]">
                  <textarea
                    className="min-h-[76px] w-full resize-none bg-transparent px-5 pb-14 pt-4 text-sm leading-6 outline-none placeholder:text-[var(--muted)]"
                    placeholder="Answer in your own words…"
                    value={draft}
                    disabled={!session || busy}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send(e as unknown as React.FormEvent);
                      }
                    }}
                  />

                  <div className="absolute bottom-3 left-5 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    Enter to send · Shift + Enter for a new line
                  </div>

                  <button
                    className="btn-primary absolute bottom-3 right-3 px-4 py-2 text-sm"
                    disabled={busy || !draft.trim() || !session}
                    type="submit"
                  >
                    {busy ? "Thinking…" : "Send →"}
                  </button>
                </div>
              </form>

              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                Don't overthink it. The conversation is supposed to start messy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
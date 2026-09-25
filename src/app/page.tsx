import Link from "next/link";

import { STAGE_META, STAGE_ORDER } from "@/lib/stages";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
        >
          brandroom
        </Link>

        <Link
          href="/interview"
          className="group flex items-center gap-2 text-sm font-medium"
        >
          Start a session
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-14 pt-10 sm:pb-20 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Hero copy */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
              A brand-building conversation
            </p>

            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.96] tracking-tight sm:text-7xl lg:text-[6.2rem]">
              Start with the idea.
              <br />
              <span className="text-[var(--terracotta)]">
                Leave with a brand.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              Have an idea but don't know how to shape it? Start a
              conversation. Brandroom asks the right questions, challenges
              your thinking, and builds your brand direction as you go.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/interview" className="btn-primary">
                Start the interview
                <span className="ml-2">→</span>
              </Link>

              <a href="#workflow" className="btn-ghost">
                See how it works
              </a>
            </div>
          </div>

          {/* Conversation preview */}
          <div className="relative">
            {/* Small label */}
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                Live conversation preview
              </span>

              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[var(--moss)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--moss)]" />
                Discover
              </span>
            </div>

            {/* Chat card */}
            <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper-2)] shadow-[0_20px_60px_rgba(28,25,21,0.08)]">
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-4">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg">
                    Brandroom
                  </p>

                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    Six-stage interview
                  </p>
                </div>

                <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  01 / 06
                </span>
              </div>

              {/* Chat content */}
              <div className="space-y-5 p-6 sm:p-7">
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--terracotta)]">
                    Brandroom · Discover
                  </p>

                  <div className="rounded-2xl rounded-tl-sm border border-[var(--line)] bg-[var(--paper)] p-4">
                    <p className="font-[family-name:var(--font-display)] text-xl leading-snug">
                      Tell me about the idea the way you'd tell a friend over
                      coffee.
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      Messy is fine. Who is this for, and what are you trying
                      to put into the world?
                    </p>
                  </div>
                </div>

                <div className="ml-auto max-w-[88%]">
                  <div className="rounded-2xl rounded-br-sm bg-[var(--ink)] p-4 text-sm leading-6 text-[var(--paper)]">
                    I'm thinking about a laundry pickup service for college
                    students. Something convenient, but it should feel more
                    premium than a normal laundry shop.
                  </div>
                </div>

                <div className="border-t border-[var(--line)] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--muted)]">
                      Your answer shapes the next stage
                    </span>

                    <span className="text-sm text-[var(--terracotta)]">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stage indicator */}
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 shadow-lg sm:block">
              <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
                Next
              </p>

              <p className="mt-1 font-[family-name:var(--font-display)] text-lg">
                Position →
              </p>
            </div>
          </div>
        </div>

        {/* Workflow strip */}
        <div className="mt-16 border-y border-[var(--line)] py-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="mr-2 text-[10px] font-medium uppercase tracking-[0.17em] text-[var(--muted)] sm:text-xs">
              Six stages
            </span>

            {STAGE_ORDER.map((id, index) => (
              <div key={id} className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {STAGE_META[id].label}
                </span>

                {index < STAGE_ORDER.length - 1 && (
                  <span className="text-[var(--line)]">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product story */}
      <section className="border-y border-[var(--line)] bg-[var(--paper-2)]">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          {/* Starting idea */}
          <div className="border-b border-[var(--line)] p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-16">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                01 · Start anywhere
              </p>

              <span className="text-xs text-[var(--muted)]">
                no perfect brief needed
              </span>
            </div>

            <div className="mt-12 max-w-lg">
              <p className="font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">
                "I want to make laundry pickup easier for students, but I
                don't want it to feel cheap."
              </p>
            </div>

            <p className="mt-10 max-w-md text-sm leading-6 text-[var(--muted)]">
              Start with the problem, the people, and the thing you wish
              existed.
            </p>
          </div>

          {/* Conversation */}
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--moss)]">
              02 · Shape the thinking
            </p>

            <div className="mt-10 space-y-4">
              <div className="ml-auto max-w-sm rounded-2xl rounded-br-sm bg-[var(--ink)] p-4 text-sm leading-6 text-[var(--paper)]">
                What should the experience feel like for the student?
              </div>

              <div className="max-w-sm rounded-2xl rounded-bl-sm border border-[var(--line)] bg-[var(--paper)] p-4 text-sm leading-6">
                Fast and reliable. More like a service I'd recommend to a
                friend than a normal laundry shop.
              </div>

              <div className="pt-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--terracotta)]">
                The idea starts taking shape →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28"
      >
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
              The workflow
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
              One conversation.
              <br />
              Six decisions.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-[var(--muted)]">
              Each answer gives the next stage more context. Instead of
              filling out a long brand questionnaire, you build the thinking
              one conversation at a time.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
            {STAGE_ORDER.map((id) => (
              <article
                key={id}
                className="group bg-[var(--paper)] p-6 transition-colors hover:bg-[var(--paper-2)] sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium tracking-[0.15em] text-[var(--terracotta)]">
                    {STAGE_META[id].number}
                  </span>

                  <span className="text-sm text-[var(--muted)] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-9 font-[family-name:var(--font-display)] text-3xl">
                  {STAGE_META[id].label}
                </h3>

                <p className="mt-3 leading-6 text-[var(--muted)]">
                  {STAGE_META[id].goal}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[var(--line)] bg-[var(--ink)] px-6 py-20 text-[var(--paper)] sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
              Brandroom
            </p>

            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-6xl">
              Bring the rough idea.
              <br />
              We'll start there.
            </h2>
          </div>

          <Link
            href="/interview"
            className="inline-flex shrink-0 items-center rounded-full bg-[var(--paper)] px-6 py-3 font-medium text-[var(--ink)] transition-transform hover:-translate-y-0.5"
          >
            Enter Brandroom
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

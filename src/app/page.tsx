import Link from "next/link";
import { STAGE_META, STAGE_ORDER } from "@/lib/stages";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5">
        <p className="font-[family-name:var(--font-display)] text-2xl">Brandroom</p>
        <Link href="/interview" className="text-sm tracking-wide uppercase text-[var(--muted)]">
          Enter the room
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-16 pt-10">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--terracotta)]">
          WCC pre-hackathon · AI brand workflow
        </p>
        <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] sm:text-7xl">
          A conversation that turns a rough idea into a launch-ready brand.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          Not a form. A consultant-style interview. Under the chat, every reply is tagged to one of
          six official stages — and each stage writes into the next.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/interview" className="btn-primary">
            Start the interview
          </Link>
          <a href="#workflow" className="btn-ghost">
            See the 6 stages
          </a>
        </div>
      </section>

      <section id="workflow" className="border-t border-[var(--line)] bg-[var(--paper-2)] px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STAGE_ORDER.map((id) => (
            <article key={id} className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--terracotta)]">
                {STAGE_META[id].number}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl">
                {STAGE_META[id].label}
              </h2>
              <p className="mt-2 text-[var(--muted)]">{STAGE_META[id].goal}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

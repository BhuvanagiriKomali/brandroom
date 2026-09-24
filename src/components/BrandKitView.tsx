import type { BrandKit } from "@/lib/types";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--line)] py-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">{label}</p>
      <div className="mt-2 text-[1.05rem] leading-relaxed">{children}</div>
    </section>
  );
}

export function BrandKitView({ kit }: { kit: BrandKit }) {
  return (
    <article className="mx-auto max-w-2xl">
      <Block label="Audience">{kit.audience || "—"}</Block>
      <Block label="Problem">{kit.problem || "—"}</Block>
      <Block label="Constraints">{kit.constraints || "—"}</Block>
      <Block label="Category">{kit.category || "—"}</Block>
      <Block label="Differentiator">{kit.differentiator || "—"}</Block>
      <Block label="Value proposition">{kit.valueProposition || "—"}</Block>
      <Block label="Personality">
        {kit.personalityTraits.length ? kit.personalityTraits.join(" · ") : "—"}
      </Block>
      <Block label="Naming directions">
        {kit.namingDirections.length ? kit.namingDirections.join(" · ") : "—"}
      </Block>
      <Block label="Name ideas">
        {kit.nameIdeas.length ? (
          <ul className="mt-1 space-y-1">
            {kit.nameIdeas.map((name) => (
              <li key={name} className="font-[family-name:var(--font-display)] text-2xl">
                {name}
              </li>
            ))}
          </ul>
        ) : (
          "—"
        )}
      </Block>
      <Block label="Tagline">
        <p className="font-[family-name:var(--font-display)] text-3xl leading-tight">
          {kit.tagline || "—"}
        </p>
      </Block>
      <Block label="Voice">{kit.voice || "—"}</Block>
      <Block label="Logo direction">{kit.logoDirection || "—"}</Block>
      <Block label="Color">
        {kit.colors.length ? (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {kit.colors.map((color) => (
              <li key={color.hex} className="flex items-center gap-3">
                <span
                  className="h-12 w-12 rounded-full border border-[var(--line)]"
                  style={{ background: color.hex }}
                />
                <span>
                  <strong>{color.name}</strong>
                  <br />
                  <span className="text-sm text-[var(--muted)]">
                    {color.hex} · {color.use}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          "—"
        )}
      </Block>
      <Block label="Typography">{kit.typography || "—"}</Block>
      <Block label="Imagery">{kit.imagery || "—"}</Block>
      <Block label="Challenge notes">{kit.challengeNotes || "—"}</Block>
      <Block label="Launch headline">
        <p className="font-[family-name:var(--font-display)] text-3xl leading-tight">
          {kit.launchHeadline || "—"}
        </p>
      </Block>
      <Block label="Pitch">{kit.pitch || "—"}</Block>
    </article>
  );
}

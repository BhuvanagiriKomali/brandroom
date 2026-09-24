"use client";

import { STAGE_META, STAGE_ORDER } from "@/lib/stages";
import type { StageId } from "@/lib/types";

type Props = {
  current: StageId;
  completed: StageId[];
};

export function StageRail({ current, completed }: Props) {
  return (
    <ol className="flex flex-col gap-1">
      {STAGE_ORDER.map((id) => {
        const active = id === current;
        const done = completed.includes(id);
        return (
          <li
            key={id}
            className={`rounded-2xl px-3 py-2.5 transition-colors ${
              active
                ? "bg-[var(--ink)] text-[var(--paper)]"
                : done
                  ? "bg-[var(--moss-soft)] text-[var(--moss)]"
                  : "text-[var(--muted)]"
            }`}
          >
            <p className="text-[10px] tracking-[0.18em] uppercase opacity-70">
              {STAGE_META[id].number}
            </p>
            <p className="font-medium">{STAGE_META[id].label}</p>
            {active ? (
              <p className="mt-1 text-xs leading-snug opacity-80">{STAGE_META[id].goal}</p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

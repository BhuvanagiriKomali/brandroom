import { EMPTY_KIT, type BrandKit } from "./types";

export function mergeKit(
  current: BrandKit,
  patch: Partial<BrandKit> | undefined,
): BrandKit {
  if (!patch) return current;
  const next: BrandKit = { ...current };

  (Object.keys(EMPTY_KIT) as (keyof BrandKit)[]).forEach((key) => {
    const value = patch[key];
    if (value === undefined || value === null) return;
    if (typeof value === "string") {
      if (value.trim()) next[key] = value as never;
      return;
    }
    if (Array.isArray(value) && value.length > 0) {
      next[key] = value as never;
    }
  });

  return next;
}

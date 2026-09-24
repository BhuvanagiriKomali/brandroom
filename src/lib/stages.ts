import type { StageId } from "./types";

export const STAGE_META: Record<
  StageId,
  { label: string; number: string; goal: string }
> = {
  discover: {
    label: "Discover",
    number: "01",
    goal: "Who it's for, the problem, and real-world constraints",
  },
  position: {
    label: "Position",
    number: "02",
    goal: "Category, differentiator, and value proposition",
  },
  shape: {
    label: "Shape",
    number: "03",
    goal: "Personality, names, tagline, and voice",
  },
  visualize: {
    label: "Visualize",
    number: "04",
    goal: "Logo direction, color, type, and imagery brief",
  },
  challenge: {
    label: "Challenge",
    number: "05",
    goal: "Stress-test for clichés and contradictions",
  },
  deliver: {
    label: "Deliver",
    number: "06",
    goal: "A launch-ready brand kit you can export",
  },
};

export const STAGE_ORDER: StageId[] = [
  "discover",
  "position",
  "shape",
  "visualize",
  "challenge",
  "deliver",
];

export function nextStageAfter(stage: StageId): StageId {
  const i = STAGE_ORDER.indexOf(stage);
  return STAGE_ORDER[Math.min(i + 1, STAGE_ORDER.length - 1)];
}

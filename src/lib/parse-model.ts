import { STAGES, type ModelTurn, type StageId } from "./types";

function asStage(value: unknown, fallback: StageId): StageId {
  return typeof value === "string" && (STAGES as readonly string[]).includes(value)
    ? (value as StageId)
    : fallback;
}

export function parseModelTurn(raw: string, fallbackStage: StageId): ModelTurn {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");

  let data: Record<string, unknown> = {};
  try {
    data = JSON.parse(cleaned) as Record<string, unknown>;
  } catch {
    data = { assistantMessage: raw, stage: fallbackStage };
  }

  const kitPatch =
    data.kitPatch && typeof data.kitPatch === "object"
      ? (data.kitPatch as ModelTurn["kitPatch"])
      : {};

  return {
    stage: asStage(data.stage, fallbackStage),
    assistantMessage:
      typeof data.assistantMessage === "string" && data.assistantMessage.trim()
        ? data.assistantMessage
        : "Say a bit more — I want the specific person this is for, not a demographic slogan.",
    kitPatch,
    stageComplete: Boolean(data.stageComplete),
    nextStage: asStage(data.nextStage, fallbackStage),
    delivered: Boolean(data.delivered),
  };
}

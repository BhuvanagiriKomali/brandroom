import { demoTurn } from "./demo-engine";
import { hasGeminiKey, runGeminiTurn } from "./gemini";
import { mergeKit } from "./merge-kit";
import { parseModelTurn } from "./parse-model";
import { markStageComplete } from "./session-store";
import type { Session } from "./types";

export async function applyUserMessage(session: Session, userText: string) {
  session.messages.push({
    role: "user",
    content: userText,
    stage: session.stage,
  });

  let raw: string;
  let usedDemo = !hasGeminiKey();

  if (!usedDemo) {
    try {
      raw = await runGeminiTurn({
        stage: session.stage,
        kit: session.kit,
        messages: session.messages,
      });
    } catch {
      usedDemo = true;
      raw = "";
    }
  } else {
    raw = "";
  }

  const turn = usedDemo
    ? demoTurn(session.stage, userText, session.kit)
    : parseModelTurn(raw, session.stage);

  session.kit = mergeKit(session.kit, turn.kitPatch);

  if (turn.stageComplete) {
    markStageComplete(session, session.stage);
    session.stage = turn.nextStage;
  } else {
    session.stage = turn.stage;
  }

  if (turn.delivered) {
    session.delivered = true;
    session.stage = "deliver";
    markStageComplete(session, "deliver");
  }

  session.messages.push({
    role: "assistant",
    content: turn.assistantMessage,
    stage: session.stage,
  });

  return { session, usedDemo };
}

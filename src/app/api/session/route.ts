import { NextResponse } from "next/server";
import { openingMessage } from "@/lib/prompts";
import { createSession, saveSession } from "@/lib/session-store";
import { hasGeminiKey } from "@/lib/gemini";

export async function POST() {
  const session = createSession();
  session.messages.push({
    role: "assistant",
    content: openingMessage(),
    stage: "discover",
  });
  saveSession(session);

  return NextResponse.json({
    session,
    usedDemo: !hasGeminiKey(),
  });
}

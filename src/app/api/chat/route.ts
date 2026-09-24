import { NextResponse } from "next/server";
import { getSession, saveSession } from "@/lib/session-store";
import { applyUserMessage } from "@/lib/run-turn";

export async function POST(request: Request) {
  const body = (await request.json()) as { sessionId?: string; message?: string };
  const sessionId = body.sessionId?.trim();
  const message = body.message?.trim();

  if (!sessionId || !message) {
    return NextResponse.json(
      { error: "sessionId and message are required" },
      { status: 400 },
    );
  }

  const session = getSession(sessionId);
  if (!session) {
    return NextResponse.json({ error: "Session not found. Start a new interview." }, { status: 404 });
  }

  const result = await applyUserMessage(session, message);
  saveSession(result.session);

  return NextResponse.json(result);
}

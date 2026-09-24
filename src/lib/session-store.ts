import { randomUUID } from "crypto";
import { EMPTY_KIT, type Session, type StageId } from "./types";

type GlobalStore = typeof globalThis & {
  brandroomSessions?: Map<string, Session>;
};

function sessions(): Map<string, Session> {
  const g = globalThis as GlobalStore;
  if (!g.brandroomSessions) g.brandroomSessions = new Map();
  return g.brandroomSessions;
}

export function createSession(): Session {
  const session: Session = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    stage: "discover",
    messages: [],
    kit: { ...EMPTY_KIT, personalityTraits: [], namingDirections: [], nameIdeas: [], colors: [] },
    completedStages: [],
    delivered: false,
  };
  sessions().set(session.id, session);
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions().get(id);
}

export function saveSession(session: Session): Session {
  sessions().set(session.id, session);
  return session;
}

export function markStageComplete(session: Session, stage: StageId): void {
  if (!session.completedStages.includes(stage)) {
    session.completedStages.push(stage);
  }
}

import { nextStageAfter } from "./stages";
import type { BrandKit, ModelTurn, StageId } from "./types";

function clip(text: string, max = 180): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

export function demoTurn(stage: StageId, userText: string, kit: BrandKit): ModelTurn {
  const said = clip(userText, 220);

  const byStage: Record<StageId, () => ModelTurn> = {
    discover: () => ({
      stage,
      assistantMessage: `I'm hearing a real problem in there: "${said}" Who is the one person this is for on a bad Tuesday — not "everyone," the specific person — and what have they already tried that failed?`,
      kitPatch: {
        problem: kit.problem || said,
        audience: kit.audience || "Early-stage founders with a rough idea and no brand yet",
        constraints: kit.constraints || "Must feel human, not like a form; launch-ready in one sitting",
      },
      stageComplete: true,
      nextStage: "position",
      delivered: false,
    }),
    position: () => ({
      stage,
      assistantMessage: `If a rival launched tomorrow with a bigger budget, what would still make this the one they'd pick? I want the unfair advantage in one sentence — then I'll lock a category around it.`,
      kitPatch: {
        category: kit.category || "AI brand studio for founders",
        differentiator:
          kit.differentiator ||
          "A staged interview that saves each chapter of the brand instead of one long chat",
        valueProposition:
          kit.valueProposition ||
          "Walk in with a messy idea. Walk out with a launch-ready brand kit.",
      },
      stageComplete: true,
      nextStage: "shape",
      delivered: false,
    }),
    shape: () => ({
      stage,
      assistantMessage: `Personality check: should this brand feel like a calm senior partner, or a slightly dangerous creative director? I'll draft names either way — tell me which energy is closer.`,
      kitPatch: {
        personalityTraits: kit.personalityTraits.length
          ? kit.personalityTraits
          : ["sharp", "warm", "unimpressed by jargon"],
        namingDirections: ["compound studio names", "short verbs", "rooms / spaces"],
        nameIdeas: ["Brandroom", "First Draft", "Foundry Hour", "Clearmark"],
        tagline: kit.tagline || "The interview that becomes your brand.",
        voice:
          kit.voice ||
          "Second person, short sentences, specific follow-ups. Sounds like a consultant, not a chatbot.",
      },
      stageComplete: true,
      nextStage: "visualize",
      delivered: false,
    }),
    visualize: () => ({
      stage,
      assistantMessage: `Visual world: I'm picturing a quiet studio, cream paper, ink, one terracotta accent — like a brand consultant's office, not a neon AI dashboard. Does that feel right, or is this louder?`,
      kitPatch: {
        logoDirection:
          kit.logoDirection ||
          "Wordmark in a serif with a small room/frame mark. No robot icons, no gradient orbs.",
        colors: [
          { name: "Paper", hex: "#F4EFE6", use: "Backgrounds" },
          { name: "Ink", hex: "#1C1915", use: "Text and logo" },
          { name: "Terracotta", hex: "#C45C32", use: "Emphasis, stage active" },
          { name: "Moss", hex: "#3F5C4B", use: "Secondary / completed stages" },
        ],
        typography: "Display: Fraunces. Body: Outfit. Captions: Outfit medium.",
        imagery: "Empty studios, paper, pencils, one founder at a table. Natural light. No stock handshakes.",
      },
      stageComplete: true,
      nextStage: "challenge",
      delivered: false,
    }),
    challenge: () => ({
      stage,
      assistantMessage: `Pushback: "AI brand interviewer" is a crowded sentence. The thing that isn't a cliché is the six saved stages — that's a workflow, not a chatbot. I'll keep the consultant tone and kill any "empower / revolutionize" language in the kit.`,
      kitPatch: {
        challengeNotes:
          "Cliché risk: generic AI-saas purple UI and 'empower founders' copy. Contradiction risk: claiming 'not a form' while asking ten questions. Fix: one follow-up at a time, visible stage rail, terracotta/paper studio look, workflow language over chatbot language.",
        tagline: "Not a form. A brand interview with a memory.",
        differentiator:
          "Each stage writes to a structured kit the next stage can argue with — including a Challenge pass that attacks clichés.",
      },
      stageComplete: true,
      nextStage: "deliver",
      delivered: false,
    }),
    deliver: () => ({
      stage,
      assistantMessage: `That's enough. Your kit is on the table: a staged brand interview for founders who hate forms. Open the brand kit to export names, voice, visual brief, and a launch headline. If anything feels off, say so — we can still revise.`,
      kitPatch: {
        launchHeadline: kit.launchHeadline || "Walk in messy. Walk out with a brand.",
        pitch:
          kit.pitch ||
          "Brandroom is a conversational AI that interviews a founder about a rough idea and, through six saved stages — Discover, Position, Shape, Visualize, Challenge, Deliver — extracts a launch-ready brand kit. It isn't a chatbot with a pretty UI. It's an AI workflow with memory.",
      },
      stageComplete: true,
      nextStage: "deliver",
      delivered: true,
    }),
  };

  const turn = byStage[stage]();
  if (turn.stageComplete && stage !== "deliver") {
    turn.nextStage = nextStageAfter(stage);
  }
  return turn;
}

# Brandroom

Conversational AI that interviews a founder about a rough idea and extracts a launch-ready brand kit. Not a form. Under the chat, every reply is tagged to one of six stages — Discover, Position, Shape, Visualize, Challenge, Deliver — and each stage writes into the next.

Built for the WCC pre-hackathon problem: turn a rough business idea into a brand.

## Why this scores as an AI workflow

The UI looks like a conversation. Internally it is a pipeline:

1. The model is told which **stage** it is in.
2. Each turn returns **JSON**: spoken reply + `kitPatch` + `stageComplete`.
3. Saved kit fields **feed the next stage**.
4. **Challenge** attacks clichés and contradictions before **Deliver**.
5. The founder exports a **brand kit** (markdown + JSON).

That is the difference between "chatbot" and "AI workflow."

## Run locally

```bash
cd Projects/brandroom
npm install
copy .env.example .env.local
# paste GEMINI_API_KEY from https://aistudio.google.com/apikey
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without a Gemini key, **demo mode** still walks the six stages so you can practice the pitch. Add a key before judging if you can — live follow-ups are stronger.

Do not commit `.env.local`.

## Demo script (3 minutes)

1. Landing: "Not a form. Six saved stages."
2. Start interview. Speak as a founder with a messy idea (30 seconds).
3. Point at the **left rail** as stages complete — that's the workflow.
4. When Challenge fires, read the cliché call-out out loud.
5. Open the brand kit. Export markdown.

Practice idea if you freeze: a campus laundry pickup service that feels premium, not cheap.

## Team of 4 — suggested split

| Person | Owns | Files |
| --- | --- | --- |
| 1 · Conversation | Chat UX, empty states, mobile rail | `src/app/interview/page.tsx`, `src/components/StageRail.tsx` |
| 2 · AI workflow | Prompts, stage rules, Gemini | `src/lib/prompts.ts`, `src/lib/run-turn.ts`, `src/lib/gemini.ts` |
| 3 · Brand kit | Kit layout, export, print polish | `src/app/kit/[id]/page.tsx`, `src/components/BrandKitView.tsx` |
| 4 · Story | Landing, visual identity, pitch | `src/app/page.tsx`, `src/app/globals.css`, this README |

Everyone should run the app once and complete one full interview.

## Stack

Next.js (App Router) · TypeScript · Tailwind · Gemini 2.0 Flash · in-memory sessions

Sessions reset when the server restarts. For a live demo, keep the interview tab open until you export.

export const STAGES = [
  "discover",
  "position",
  "shape",
  "visualize",
  "challenge",
  "deliver",
] as const;

export type StageId = (typeof STAGES)[number];

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
  stage: StageId;
};

export type BrandKit = {
  audience: string;
  problem: string;
  constraints: string;
  category: string;
  differentiator: string;
  valueProposition: string;
  personalityTraits: string[];
  namingDirections: string[];
  nameIdeas: string[];
  tagline: string;
  voice: string;
  logoDirection: string;
  colors: { name: string; hex: string; use: string }[];
  typography: string;
  imagery: string;
  challengeNotes: string;
  launchHeadline: string;
  pitch: string;
};

export const EMPTY_KIT: BrandKit = {
  audience: "",
  problem: "",
  constraints: "",
  category: "",
  differentiator: "",
  valueProposition: "",
  personalityTraits: [],
  namingDirections: [],
  nameIdeas: [],
  tagline: "",
  voice: "",
  logoDirection: "",
  colors: [],
  typography: "",
  imagery: "",
  challengeNotes: "",
  launchHeadline: "",
  pitch: "",
};

export type Session = {
  id: string;
  createdAt: string;
  stage: StageId;
  messages: ChatMessage[];
  kit: BrandKit;
  completedStages: StageId[];
  delivered: boolean;
};

export type ModelTurn = {
  stage: StageId;
  assistantMessage: string;
  kitPatch: Partial<BrandKit>;
  stageComplete: boolean;
  nextStage: StageId;
  delivered: boolean;
};

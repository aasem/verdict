export type Trait = {
  name: string;
  score: number;
};

export type GameTraits = {
  [key: string]: Trait;
};

export type Effect = {
  [key: string]: number;
};

export type Scenario = {
  id: string;
  subject: string;
  role: string;
  scenario: string;
  question: string;
  choices: string[];
  effects: Effect[];
};

export type GameState = {
  traits: GameTraits;
  currentScenario: Scenario | null;
  questionCount: number;
  startTime: number;
  usedScenarioIds: string[];
  isGameComplete: boolean;
}; 
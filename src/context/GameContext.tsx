import React, {createContext, useContext, useState, useEffect} from 'react';
import {GameState, GameTraits, Scenario} from '../types/game';
import scenariosData from '../data/scenarios.json';

// Initialize all possible traits
const initialTraits: GameTraits = {
  judgment: {name: 'Judgment', score: 0},
  stability: {name: 'Stability', score: 0},
  agency: {name: 'Agency', score: 0},
  trust: {name: 'Trust', score: 0},
  impact: {name: 'Impact', score: 0},
  integrity: {name: 'Integrity', score: 0},
  publicApproval: {name: 'Public Approval', score: 0},
  alignment: {name: 'Alignment', score: 0},
  clarity: {name: 'Clarity', score: 0},
};

const MAX_SCENARIOS = 10;

// Helper function to calculate normalized and adjusted scores
const calculateScores = (traits: GameTraits, questionCount: number) => {
  const rawScores: {[key: string]: number} = {};
  const normalizedScores: {[key: string]: number} = {};
  const adjustedScores: {[key: string]: number} = {};

  // Calculate raw scores
  Object.entries(traits).forEach(([trait, data]) => {
    rawScores[trait] = data.score;
  });

  // Calculate normalized scores (per question)
  Object.entries(rawScores).forEach(([trait, score]) => {
    normalizedScores[trait] = questionCount > 0 ? score / questionCount : 0;
  });

  // Calculate adjusted scores (scaled to 10 questions)
  Object.entries(normalizedScores).forEach(([trait, score]) => {
    adjustedScores[trait] = Math.round(score * 10);
  });

  return {
    rawScores,
    normalizedScores,
    adjustedScores,
  };
};

const GameContext = createContext<{
  gameState: GameState;
  selectChoice: (choiceIndex: number) => void;
  resetGame: () => void;
  getScores: () => {
    rawScores: {[key: string]: number};
    normalizedScores: {[key: string]: number};
    adjustedScores: {[key: string]: number};
  };
}>({
  gameState: {
    traits: initialTraits,
    currentScenario: null,
    questionCount: 0,
    startTime: Date.now(),
    usedScenarioIds: [],
    isGameComplete: false,
  },
  selectChoice: () => {},
  resetGame: () => {},
  getScores: () => ({
    rawScores: {},
    normalizedScores: {},
    adjustedScores: {},
  }),
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    traits: initialTraits,
    currentScenario: null,
    questionCount: 0,
    startTime: Date.now(),
    usedScenarioIds: [],
    isGameComplete: false,
  });

  const getRandomScenario = (): Scenario | null => {
    // Filter out scenarios that have already been used
    const availableScenarios = scenariosData.filter(
      scenario => !gameState.usedScenarioIds.includes(scenario.id),
    );

    // If all scenarios have been used or we've reached max scenarios, return null
    if (availableScenarios.length === 0 || gameState.questionCount >= MAX_SCENARIOS) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableScenarios.length);
    return availableScenarios[randomIndex];
  };

  const selectChoice = (choiceIndex: number) => {
    if (!gameState.currentScenario) return;

    const selectedEffect = gameState.currentScenario.effects[choiceIndex];
    const newTraits = {...gameState.traits};
    const currentScenarioId = gameState.currentScenario.id;

    // Update trait scores based on choice effects
    Object.entries(selectedEffect).forEach(([trait, score]) => {
      if (newTraits[trait]) {
        newTraits[trait].score += score;
      }
    });

    const newQuestionCount = gameState.questionCount + 1;
    const newUsedScenarioIds = [...gameState.usedScenarioIds, currentScenarioId];

    // Get next scenario using updated usedScenarioIds
    const availableScenarios = scenariosData.filter(
      scenario => !newUsedScenarioIds.includes(scenario.id),
    );

    const nextScenario = availableScenarios.length > 0 && newQuestionCount < MAX_SCENARIOS
      ? availableScenarios[Math.floor(Math.random() * availableScenarios.length)]
      : null;

    setGameState(prev => ({
      ...prev,
      traits: newTraits,
      questionCount: newQuestionCount,
      currentScenario: nextScenario,
      usedScenarioIds: newUsedScenarioIds,
      isGameComplete: newQuestionCount >= MAX_SCENARIOS || nextScenario === null,
    }));
  };

  const resetGame = () => {
    const availableScenarios = scenariosData;
    const initialScenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
    
    setGameState({
      traits: initialTraits,
      currentScenario: initialScenario,
      questionCount: 0,
      startTime: Date.now(),
      usedScenarioIds: [],
      isGameComplete: false,
    });
  };

  const getScores = () => {
    return calculateScores(gameState.traits, gameState.questionCount);
  };

  useEffect(() => {
    // Initialize first scenario
    const availableScenarios = scenariosData;
    const initialScenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
    
    setGameState(prev => ({
      ...prev,
      currentScenario: initialScenario,
    }));
  }, []);

  return (
    <GameContext.Provider value={{gameState, selectChoice, resetGame, getScores}}>
      {children}
    </GameContext.Provider>
  );
}; 
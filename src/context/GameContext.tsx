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

const GameContext = createContext<{
  gameState: GameState;
  selectChoice: (choiceIndex: number) => void;
  resetGame: () => void;
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

    // Update trait scores based on choice effects
    Object.entries(selectedEffect).forEach(([trait, score]) => {
      if (newTraits[trait]) {
        newTraits[trait].score += score;
      }
    });

    const nextScenario = getRandomScenario();
    const newQuestionCount = gameState.questionCount + 1;

    setGameState(prev => ({
      ...prev,
      traits: newTraits,
      questionCount: newQuestionCount,
      currentScenario: nextScenario,
      usedScenarioIds: [...prev.usedScenarioIds, prev.currentScenario?.id || ''],
      isGameComplete: newQuestionCount >= MAX_SCENARIOS || nextScenario === null,
    }));
  };

  const resetGame = () => {
    const initialScenario = getRandomScenario();
    setGameState({
      traits: initialTraits,
      currentScenario: initialScenario,
      questionCount: 0,
      startTime: Date.now(),
      usedScenarioIds: [],
      isGameComplete: false,
    });
  };

  useEffect(() => {
    // Initialize first scenario
    const initialScenario = getRandomScenario();
    setGameState(prev => ({
      ...prev,
      currentScenario: initialScenario,
    }));
  }, []);

  return (
    <GameContext.Provider value={{gameState, selectChoice, resetGame}}>
      {children}
    </GameContext.Provider>
  );
}; 
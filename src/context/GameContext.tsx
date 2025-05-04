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
  });

  const getRandomScenario = (): Scenario => {
    // Filter out scenarios that have already been used
    const availableScenarios = scenariosData.filter(
      scenario => !gameState.usedScenarioIds.includes(scenario.id),
    );

    // If all scenarios have been used, return the first scenario
    // This should never happen in a 90-second game
    if (availableScenarios.length === 0) {
      return scenariosData[0];
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

    setGameState(prev => ({
      ...prev,
      traits: newTraits,
      questionCount: prev.questionCount + 1,
      currentScenario: nextScenario,
      usedScenarioIds: [...prev.usedScenarioIds, prev.currentScenario?.id || ''],
    }));
  };

  const resetGame = () => {
    setGameState({
      traits: initialTraits,
      currentScenario: getRandomScenario(),
      questionCount: 0,
      startTime: Date.now(),
      usedScenarioIds: [],
    });
  };

  useEffect(() => {
    // Initialize first scenario
    setGameState(prev => ({
      ...prev,
      currentScenario: getRandomScenario(),
    }));
  }, []);

  return (
    <GameContext.Provider value={{gameState, selectChoice, resetGame}}>
      {children}
    </GameContext.Provider>
  );
}; 
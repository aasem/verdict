import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useGame} from '../context/GameContext';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

// Temporary mock scenario for UI testing
const mockScenario = {
  id: 'scenario_001',
  subject: 'Collateral or Consequences?',
  role: 'You are a military commander overseeing a drone surveillance zone.',
  scenario: 'Intel confirms a high-value target is meeting in a civilian area. The window to strike is short, but there\'s a risk of collateral damage.',
  question: 'What would you do?',
  choices: [
    'Authorize the strike immediately',
    'Delay and monitor for a cleaner opportunity',
    'Warn allies on the ground and risk losing the target',
    'Cancel the mission and escalate for political approval',
  ],
};

const OnboardingScreen = ({navigation}: Props) => {
  const {gameState, selectChoice} = useGame();
  const [timeLeft, setTimeLeft] = useState(90); // 1 minute and 30 seconds
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShouldNavigate(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle navigation when timer reaches zero
  useEffect(() => {
    if (shouldNavigate) {
      navigation.replace('Results', {
        traits: gameState.traits,
        questionCount: gameState.questionCount,
      });
    }
  }, [shouldNavigate, navigation, gameState]);

  const handleChoice = (index: number) => {
    setSelectedChoice(index);
    selectChoice(index);
    setSelectedChoice(null); // Reset selection for next scenario
  };

  if (!gameState.currentScenario) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading scenario...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timer}>Time Left: {formatTime(timeLeft)}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.scenarioContainer}>
          <Text style={styles.subject}>{gameState.currentScenario.subject}</Text>
          <Text style={styles.role}>{gameState.currentScenario.role}</Text>
          <Text style={styles.scenario}>{gameState.currentScenario.scenario}</Text>
          <Text style={styles.question}>{gameState.currentScenario.question}</Text>
        </View>

        <View style={styles.choicesContainer}>
          {gameState.currentScenario.choices.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.choiceButton,
                selectedChoice === index && styles.selectedChoice,
              ]}
              onPress={() => handleChoice(index)}>
              <Text
                style={[
                  styles.choiceText,
                  selectedChoice === index && styles.selectedChoiceText,
                ]}>
                {choice}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scenarioContainer: {
    marginBottom: 24,
  },
  subject: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  role: {
    fontSize: 18,
    marginBottom: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  scenario: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  choicesContainer: {
    gap: 16,
    paddingHorizontal: 8,
  },
  choiceButton: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedChoice: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
    shadowColor: '#2196F3',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  choiceText: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 22,
  },
  selectedChoiceText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666666',
  },
});

export default OnboardingScreen; 
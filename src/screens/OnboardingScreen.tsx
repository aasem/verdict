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
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

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

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<Props>();
  const {gameState, selectChoice} = useGame();
  const [timeLeft, setTimeLeft] = useState(90);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !gameState.isGameComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 || gameState.isGameComplete) {
      setShouldNavigate(true);
    }
  }, [timeLeft, gameState.isGameComplete]);

  // Navigation effect
  useEffect(() => {
    if (shouldNavigate) {
      navigation.replace('Results', {
        traits: gameState.traits,
        questionCount: gameState.questionCount,
      });
    }
  }, [shouldNavigate, navigation, gameState.traits, gameState.questionCount]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameState.currentScenario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading scenario...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timerText}>Time Left: {formatTime(timeLeft)}</Text>
        <Text style={styles.questionCount}>
          Question {gameState.questionCount + 1}/10
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subject}>{gameState.currentScenario.subject}</Text>
        <Text style={styles.role}>{gameState.currentScenario.role}</Text>
        <Text style={styles.scenario}>{gameState.currentScenario.scenario}</Text>
        <Text style={styles.question}>{gameState.currentScenario.question}</Text>

        <View style={styles.choicesContainer}>
          {gameState.currentScenario.choices.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={styles.choiceButton}
              onPress={() => selectChoice(index)}>
              <Text style={styles.choiceText}>{choice}</Text>
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
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  timerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionCount: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subject: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  role: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  scenario: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 24,
    lineHeight: 24,
  },
  question: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  choicesContainer: {
    gap: 12,
  },
  choiceButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  choiceText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OnboardingScreen; 
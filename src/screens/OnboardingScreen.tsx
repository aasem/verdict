import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Mock scenarios - you can replace these with your actual scenarios
const scenarios = [
  {
    id: 1,
    text: 'Scenario 1: Would you invest in a startup with high risk but potential high returns?',
  },
  {
    id: 2,
    text: 'Scenario 2: Would you choose a stable job over an exciting but uncertain opportunity?',
  },
  // Add more scenarios as needed
];

const OnboardingScreen = ({navigation}: any) => {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [responses, setResponses] = useState<{[key: number]: string}>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigation.replace('Results', {responses});
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigation, responses]);

  const handleResponse = (response: string) => {
    setResponses(prev => ({
      ...prev,
      [scenarios[currentScenarioIndex].id]: response,
    }));

    // Move to next scenario or end if it's the last one
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      navigation.replace('Results', {responses});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <View style={styles.scenarioContainer}>
        <Text style={styles.scenarioText}>
          {scenarios[currentScenarioIndex].text}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.yesButton]}
          onPress={() => handleResponse('Yes')}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={() => handleResponse('No')}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  scenarioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scenarioText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#4CAF50',
  },
  noButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen; 
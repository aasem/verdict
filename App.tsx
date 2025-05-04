/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import {GameProvider} from './src/context/GameContext';
import type {GameTraits} from './src/types/game';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Results: {
    traits: GameTraits;
    questionCount: number;
    rawScores: {[key: string]: number};
    normalizedScores: {[key: string]: number};
    adjustedScores: {[key: string]: number};
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

export default App;

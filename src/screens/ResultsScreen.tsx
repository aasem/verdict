import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ResultsScreen = ({route}: Props) => {
  const {traits, questionCount} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Game Results</Text>
        <Text style={styles.subtitle}>Questions Answered: {questionCount}</Text>

        <View style={styles.traitsContainer}>
          {Object.entries(traits).map(([key, trait]) => (
            <View key={key} style={styles.traitRow}>
              <Text style={styles.traitName}>{trait.name}</Text>
              <Text style={styles.traitScore}>{trait.score}</Text>
            </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 24,
  },
  traitsContainer: {
    gap: 16,
  },
  traitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  traitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
  },
  traitScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default ResultsScreen; 
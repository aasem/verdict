import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const ResultsScreen = ({route}: any) => {
  const {responses} = route.params;

  const calculateResults = () => {
    const total = Object.keys(responses).length;
    const yesCount = Object.values(responses).filter(r => r === 'Yes').length;
    const noCount = total - yesCount;

    return {
      total,
      yesCount,
      noCount,
      yesPercentage: ((yesCount / total) * 100).toFixed(1),
      noPercentage: ((noCount / total) * 100).toFixed(1),
    };
  };

  const results = calculateResults();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Results</Text>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Scenarios: {results.total}
        </Text>
        <Text style={styles.summaryText}>
          Yes Responses: {results.yesCount} ({results.yesPercentage}%)
        </Text>
        <Text style={styles.summaryText}>
          No Responses: {results.noCount} ({results.noPercentage}%)
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Detailed Responses:</Text>
        {Object.entries(responses).map(([scenarioId, response]) => (
          <View key={scenarioId} style={styles.responseItem}>
            <Text style={styles.scenarioId}>Scenario {scenarioId}</Text>
            <Text style={[
              styles.response,
              response === 'Yes' ? styles.yesResponse : styles.noResponse
            ]}>
              {response}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  summaryContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 5,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  responseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  scenarioId: {
    fontSize: 16,
  },
  response: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  yesResponse: {
    color: '#4CAF50',
  },
  noResponse: {
    color: '#F44336',
  },
});

export default ResultsScreen; 
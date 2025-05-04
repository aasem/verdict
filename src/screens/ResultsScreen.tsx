import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useGame} from '../context/GameContext';
import {analyzeTraits} from '../utils/traitMapping';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC<Props> = ({route}) => {
  const {adjustedScores} = route.params;
  const analysis = analyzeTraits(adjustedScores);

  const formatTraitName = (trait: string): string => {
    const traitMap: {[key: string]: string} = {
      judgment: 'Judgment',
      stability: 'Stability',
      agency: 'Agency',
      trust: 'Trust',
      impact: 'Impact',
      integrity: 'Integrity',
      publicApproval: 'Public Approval',
      alignment: 'Alignment',
      clarity: 'Clarity'
    };
    return traitMap[trait] || trait;
  };

  const renderTraitBar = (trait: string, score: number) => {
    const normalizedScore = Math.max(Math.min(score, 10), -10); // Clamp between -10 and 10
    const barWidth = Math.abs(normalizedScore) * 5; // 5% width per point
    const isPositive = normalizedScore >= 0;
    
    return (
      <View style={styles.traitRow}>
        <Text style={styles.traitName}>{formatTraitName(trait)}</Text>
        <View style={styles.barContainer}>
          <View style={[styles.bar, {width: `${barWidth}%`}, isPositive ? styles.positiveBar : styles.negativeBar]} />
        </View>
        <Text style={[styles.scoreText, isPositive ? styles.positiveScore : styles.negativeScore]}>
          {score}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Text style={styles.profileTitle}>{analysis.profile.name}</Text>
          <Text style={styles.profileDescription}>{analysis.profile.description}</Text>
        </View>

        {/* Caution Tags */}
        {analysis.cautionTags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Areas for Improvement</Text>
            {analysis.cautionTags.map((tag, index) => (
              <View key={index} style={styles.tagContainer}>
                <Text style={styles.tagText}>⚠️ {tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Major Flaw Tags */}
        {analysis.flawTags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Critical Concerns</Text>
            {analysis.flawTags.map((tag, index) => (
              <View key={index} style={[styles.tagContainer, styles.flawTag]}>
                <Text style={styles.tagText}>🚨 {tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Trait Scores */}
        <View style={styles.scoresSection}>
          <Text style={styles.sectionTitle}>Trait Scores</Text>
          {Object.entries(adjustedScores).map(([trait, score]) => (
            <View key={trait}>
              {renderTraitBar(trait, score)}
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
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    backgroundColor: '#252525',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  profileTitle: {
    color: '#FFC107',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileDescription: {
    color: '#E0E0E0',
    fontSize: 16,
    lineHeight: 24,
  },
  tagsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFC107',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tagContainer: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  flawTag: {
    backgroundColor: '#4a1c1c',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  scoresSection: {
    backgroundColor: '#252525',
    padding: 16,
    borderRadius: 12,
  },
  traitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  traitName: {
    color: '#E0E0E0',
    width: 120, // Increased width to accommodate longer names
    fontSize: 14,
    fontWeight: '500', // Slightly bolder for better readability
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  positiveBar: {
    backgroundColor: '#4CAF50',
  },
  negativeBar: {
    backgroundColor: '#F44336',
  },
  scoreText: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
  positiveScore: {
    color: '#4CAF50',
  },
  negativeScore: {
    color: '#F44336',
  },
});

export default ResultsScreen; 
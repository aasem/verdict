import {GameTraits} from '../types/game';

type TraitAnalysis = {
  coreIdentity: {
    trait: string;
    score: number;
    label: string;
  }[];
  secondaryTendencies: {
    trait: string;
    score: number;
    label: string;
  }[];
  blindSpots: {
    trait: string;
    score: number;
    label: string;
  }[];
  profile: {
    name: string;
    description: string;
  };
  cautionTags: string[];
  flawTags: string[];
};

const SCORE_RANGES = {
  DOMINANT: {min: 8, label: 'Dominant Trait'},
  STRONG: {min: 6, max: 7, label: 'Strong Trait'},
  NEUTRAL: {min: 0, max: 5, label: 'Neutral Trait'},
  WEAK: {min: -5, max: -1, label: 'Weak Trait'},
  CRITICAL: {max: -6, label: 'Critical Weakness'},
};

const PROFILE_MAPPING = {
  judgment: {
    name: 'The Rational Strategist',
    description: 'You excel at making well-reasoned decisions and strategic planning. Your analytical approach helps you navigate complex situations with clarity.',
  },
  trust: {
    name: 'The Empathic Leader',
    description: 'You build strong relationships through understanding and trust. Your ability to connect with others makes you an effective leader.',
  },
  agency: {
    name: 'The Executor',
    description: 'You take decisive action and drive results. Your proactive approach helps you achieve goals effectively.',
  },
  stability: {
    name: 'The Stabilizer',
    description: 'You maintain balance and consistency in challenging situations. Your steady presence helps create reliable outcomes.',
  },
  integrity: {
    name: 'The Ethical Architect',
    description: 'You build on strong moral foundations. Your principled approach guides your decisions and actions.',
  },
  impact: {
    name: 'The Popular Reformer',
    description: 'You drive meaningful change that resonates with others. Your influence helps create positive transformations.',
  },
  clarity: {
    name: 'The Coherent Thinker',
    description: 'You communicate complex ideas with precision. Your clear thinking helps others understand and align with your vision.',
  },
  alignment: {
    name: 'The Aligned Strategist',
    description: 'You ensure actions align with broader goals. Your strategic coordination helps maintain focus and direction.',
  },
  publicApproval: {
    name: 'The Crowd Navigator',
    description: 'You understand and respond to public sentiment effectively. Your awareness helps guide decisions that resonate with others.',
  },
};

const CAUTION_TAGS = {
  judgment: 'Limited Analysis: Complex situations may be challenging to navigate.',
  trust: 'Low Trust: Others may not align with your direction.',
  agency: 'Passive Approach: Opportunities may be missed due to hesitation.',
  stability: 'Unstable Foundation: Changes may cause unnecessary disruption.',
  integrity: 'Ethical Gaps: Decisions may lack moral consistency.',
  impact: 'Limited Influence: Changes may not gain necessary support.',
  clarity: 'Poor Communication: Your reasoning may not be clear.',
  alignment: 'Misaligned Actions: Efforts may not support core objectives.',
  publicApproval: 'Public Resistance: Changes may face significant pushback.',
};

const FLAW_TAGS = {
  judgment: 'Critical Analysis Failure: Complex decisions may lead to significant errors.',
  trust: 'Trust Crisis: Relationships and leadership may be severely compromised.',
  agency: 'Action Paralysis: Critical opportunities may be consistently missed.',
  stability: 'Systemic Instability: Changes may cause widespread disruption.',
  integrity: 'Ethical Crisis: Actions may fundamentally conflict with core values.',
  impact: 'Impact Failure: Changes may face overwhelming resistance.',
  clarity: 'Communication Breakdown: Core messages may be consistently misunderstood.',
  alignment: 'Strategic Misalignment: Actions may fundamentally contradict goals.',
  publicApproval: 'Public Rejection: Changes may face overwhelming opposition.',
};

export const analyzeTraits = (adjustedScores: {[key: string]: number}): TraitAnalysis => {
  const analysis: TraitAnalysis = {
    coreIdentity: [],
    secondaryTendencies: [],
    blindSpots: [],
    profile: {
      name: 'The Generalist',
      description: "You're balanced and versatile. No single trait dominates, and that's a strength too.",
    },
    cautionTags: [],
    flawTags: [],
  };

  // Sort traits by absolute score to find most significant traits
  const sortedTraits = Object.entries(adjustedScores).sort(
    ([, scoreA], [, scoreB]) => Math.abs(scoreB) - Math.abs(scoreA),
  );

  // Track dominant/strong traits for profile assignment
  const significantTraits = sortedTraits.filter(([, score]) => score >= SCORE_RANGES.STRONG.min);

  // Assign profile based on highest scoring significant trait
  if (significantTraits.length > 0) {
    const [topTrait] = significantTraits;
    analysis.profile = PROFILE_MAPPING[topTrait[0] as keyof typeof PROFILE_MAPPING];
  }

  // Process all traits
  sortedTraits.forEach(([trait, score]) => {
    const traitInfo = {
      trait,
      score,
      label: getScoreLabel(score),
    };

    // Core Identity: Dominant traits (≥ +8)
    if (score >= SCORE_RANGES.DOMINANT.min) {
      analysis.coreIdentity.push(traitInfo);
    }
    // Secondary Tendencies: Strong traits (+6 to +7)
    else if (score >= SCORE_RANGES.STRONG.min && score <= SCORE_RANGES.STRONG.max) {
      analysis.secondaryTendencies.push(traitInfo);
    }
    // Blind Spots: Critical weaknesses (≤ -6) or significant inconsistencies
    else if (score <= SCORE_RANGES.CRITICAL.max) {
      analysis.blindSpots.push(traitInfo);
      analysis.flawTags.push(FLAW_TAGS[trait as keyof typeof FLAW_TAGS]);
    }
    // Caution Tags: Weak traits (-1 to -5)
    else if (score <= SCORE_RANGES.WEAK.max && score >= SCORE_RANGES.WEAK.min) {
      analysis.cautionTags.push(CAUTION_TAGS[trait as keyof typeof CAUTION_TAGS]);
    }
  });

  // Add inconsistencies to blind spots
  const inconsistencies = findInconsistencies(adjustedScores);
  analysis.blindSpots.push(...inconsistencies);

  return analysis;
};

const getScoreLabel = (score: number): string => {
  if (score >= SCORE_RANGES.DOMINANT.min) return SCORE_RANGES.DOMINANT.label;
  if (score >= SCORE_RANGES.STRONG.min && score <= SCORE_RANGES.STRONG.max) return SCORE_RANGES.STRONG.label;
  if (score >= SCORE_RANGES.NEUTRAL.min && score <= SCORE_RANGES.NEUTRAL.max) return SCORE_RANGES.NEUTRAL.label;
  if (score >= SCORE_RANGES.WEAK.min && score <= SCORE_RANGES.WEAK.max) return SCORE_RANGES.WEAK.label;
  return SCORE_RANGES.CRITICAL.label;
};

const findInconsistencies = (scores: {[key: string]: number}) => {
  const inconsistencies: {trait: string; score: number; label: string}[] = [];
  
  // Define related trait pairs that should be somewhat aligned
  const relatedPairs = [
    ['judgment', 'clarity'],
    ['stability', 'alignment'],
    ['trust', 'integrity'],
    ['impact', 'publicApproval'],
  ];

  relatedPairs.forEach(([trait1, trait2]) => {
    const score1 = scores[trait1] || 0;
    const score2 = scores[trait2] || 0;
    const difference = Math.abs(score1 - score2);

    // If the difference is significant (more than 5 points)
    if (difference > 5) {
      // Add the lower scoring trait as a potential blind spot
      const lowerTrait = score1 < score2 ? trait1 : trait2;
      const lowerScore = Math.min(score1, score2);
      
      inconsistencies.push({
        trait: lowerTrait,
        score: lowerScore,
        label: `Inconsistent with ${score1 < score2 ? trait2 : trait1}`,
      });
    }
  });

  return inconsistencies;
};

// Updated helper function to get a human-readable description of the analysis
export const getAnalysisDescription = (analysis: TraitAnalysis): string => {
  const descriptions: string[] = [];

  // Profile description
  descriptions.push(`Profile: ${analysis.profile.name}`);
  descriptions.push(`Description: ${analysis.profile.description}`);

  // Core Identity description
  if (analysis.coreIdentity.length > 0) {
    const coreTraits = analysis.coreIdentity
      .map(t => `${t.trait} (${t.score})`)
      .join(', ');
    descriptions.push(`Core Identity: ${coreTraits}`);
  }

  // Secondary Tendencies description
  if (analysis.secondaryTendencies.length > 0) {
    const secondaryTraits = analysis.secondaryTendencies
      .map(t => `${t.trait} (${t.score})`)
      .join(', ');
    descriptions.push(`Secondary Tendencies: ${secondaryTraits}`);
  }

  // Blind Spots description
  if (analysis.blindSpots.length > 0) {
    const blindSpots = analysis.blindSpots
      .map(t => `${t.trait} (${t.score})${t.label.startsWith('Inconsistent') ? ` - ${t.label}` : ''}`)
      .join(', ');
    descriptions.push(`Blind Spots: ${blindSpots}`);
  }

  // Caution Tags
  if (analysis.cautionTags.length > 0) {
    descriptions.push('Cautions:');
    analysis.cautionTags.forEach(tag => descriptions.push(`- ${tag}`));
  }

  // Flaw Tags
  if (analysis.flawTags.length > 0) {
    descriptions.push('Major Flaws:');
    analysis.flawTags.forEach(tag => descriptions.push(`- ${tag}`));
  }

  return descriptions.join('\n');
}; 
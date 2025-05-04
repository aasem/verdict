# Verdict Game Logic

## Scoring Parameters
The game uses 9 universal traits to track player decisions:

1. **judgment** - Decision-making quality and wisdom
2. **stability** - Maintaining order and preventing chaos
3. **agency** - Taking initiative and responsibility
4. **trust** - Building and maintaining trust
5. **integrity** - Moral and ethical consistency
6. **impact** - Consequences of decisions
7. **clarity** - Communication and transparency
8. **alignment** - Consistency with values and goals
9. **publicApproval** - Public perception and support

## Effect Sizes
Each choice's impact on trait is categorized by magnitude:

| Label | Value Range | Meaning |
|-------|-------------|---------|
| 🔵 Minor | ±1 | Soft influence |
| 🟡 Moderate | ±2 | Strategic consequence |
| 🔴 Major | ±3 | Significant trade-off |

## Trait Mapping
Final trait scores are mapped to player characteristics and used for profile generation:

| Score Range  | Label             | Use for Profiles                                      |
| ------------ | ----------------- | ----------------------------------------------------- |
| **≥ +8**     | Dominant Trait    | Core profile definer — used to match main identity    |
| **+6 to +7** | Strong Trait      | Supporting traits — refines profile or adds nuance    |
| **0 to +5** | Neutral Trait     | Balanced trait — no strong influence on profile       |
| **-1 to -5** | Weak Trait        | Adds flaw tags or mild limitations                    |
| **≤ -6**     | Critical Weakness | Excludes certain profiles or triggers major flaw tags |


## Profile Assignments
Based on trait scores, players are assigned one of the following profiles. The profile is determined by the highest scoring trait that is either Dominant (≥ +8) or Strong (≥ +6). If no trait meets this threshold, the player is assigned "The Generalist" profile.

| Dominant or Strong Trait | Profile Name           | Description |
|-------------------------|------------------------|-------------|
| `judgment`              | The Rational Strategist | You excel at making well-reasoned decisions and strategic planning. Your analytical approach helps you navigate complex situations with clarity. |
| `trust`                 | The Empathic Leader    | You build strong relationships through understanding and trust. Your ability to connect with others makes you an effective leader. |
| `agency`                | The Executor           | You take decisive action and drive results. Your proactive approach helps you achieve goals effectively. |
| `stability`             | The Stabilizer         | You maintain balance and consistency in challenging situations. Your steady presence helps create reliable outcomes. |
| `integrity`             | The Ethical Architect  | You build on strong moral foundations. Your principled approach guides your decisions and actions. |
| `impact`                | The Popular Reformer   | You drive meaningful change that resonates with others. Your influence helps create positive transformations. |
| `clarity`               | The Coherent Thinker   | You communicate complex ideas with precision. Your clear thinking helps others understand and align with your vision. |
| `alignment`             | The Aligned Strategist | You ensure actions align with broader goals. Your strategic coordination helps maintain focus and direction. |
| `publicApproval`        | The Crowd Navigator    | You understand and respond to public sentiment effectively. Your awareness helps guide decisions that resonate with others. |

### The Generalist
If no trait scores reach the Strong threshold (≥ +6), the player is assigned "The Generalist" profile:
"You're balanced and versatile. No single trait dominates, and that's a strength too."

### Caution Tags
For traits scoring between -1 and -5, the following caution tags are assigned:

| Trait          | Caution Message |
|----------------|-----------------|
| `judgment`     | Limited Analysis: Complex situations may be challenging to navigate. |
| `trust`        | Low Trust: Others may not align with your direction. |
| `agency`       | Passive Approach: Opportunities may be missed due to hesitation. |
| `stability`    | Unstable Foundation: Changes may cause unnecessary disruption. |
| `integrity`    | Ethical Gaps: Decisions may lack moral consistency. |
| `impact`       | Limited Influence: Changes may not gain necessary support. |
| `clarity`      | Poor Communication: Your reasoning may not be clear. |
| `alignment`    | Misaligned Actions: Efforts may not support core objectives. |
| `publicApproval` | Public Resistance: Changes may face significant pushback. |

### Major Flaw Tags
For traits scoring ≤ -6, the following major flaw tags are assigned:

| Trait          | Flaw Message |
|----------------|--------------|
| `judgment`     | Critical Analysis Failure: Complex decisions may lead to significant errors. |
| `trust`        | Trust Crisis: Relationships and leadership may be severely compromised. |
| `agency`       | Action Paralysis: Critical opportunities may be consistently missed. |
| `stability`    | Systemic Instability: Changes may cause widespread disruption. |
| `integrity`    | Ethical Crisis: Actions may fundamentally conflict with core values. |
| `impact`       | Impact Failure: Changes may face overwhelming resistance. |
| `clarity`      | Communication Breakdown: Core messages may be consistently misunderstood. |
| `alignment`    | Strategic Misalignment: Actions may fundamentally contradict goals. |
| `publicApproval` | Public Rejection: Changes may face overwhelming opposition. |

## Scoring Rules
- Each choice affects all nine traits
- Trait scores range from -3 to +3
- Final scores are cumulative across all scenarios
- No overall score is calculated; each trait is tracked separately

## Game Flow
1. 90-second time limit
2. Random scenario selection (no repeats)
3. Player makes choice
4. Effects are applied to all traits
5. Next scenario is presented
6. Game ends when time runs out
7. Final scores show cumulative effect on each trait 
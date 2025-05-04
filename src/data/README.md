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
Based on trait scores, players are assigned one of the following profiles:

### 1. 🧠 The Rational Strategist
You prioritize sound reasoning and structured clarity, often at the cost of emotional rapport or adaptability.

**Requirements:**
- judgment ≥ 8
- clarity ≥ 6

**Flaw Tags:**
- trust ≤ -4 → Detached Analyst
- alignment ≤ -4 → Cold Technician

### 2. 🫱 The Empathic Leader
You inspire trust and act with integrity. Your strength lies in relationships, but execution may lag.

**Requirements:**
- trust ≥ 8
- integrity ≥ 6

**Flaw Tags:**
- agency ≤ -4 → Over-Delegator
- judgment ≤ -3 → Sentimental Decision-Maker

### 3. 🔥 The Stabilizer
You excel at creating resilient systems and preventing chaos — though you may hesitate in fast-paced crises.

**Requirements:**
- stability ≥ 8
- Bonus if: alignment ≥ 6 OR impact ≥ 6

**Flaw Tags:**
- agency ≤ -4 → Frozen Operator
- impact ≤ -4 → Risk-Averse to a Fault

### 4. 🧍 The Executor
You lead with initiative and drive. You solve problems quickly, though your methods can strain systems and people.

**Requirements:**
- agency ≥ 8
- Bonus if: impact ≥ 6 OR judgment ≥ 6

**Flaw Tags:**
- trust ≤ -4 → Lone Wolf
- stability ≤ -4 → Break-it-to-Fix-it Leader

### 5. ⚖️ The Ethical Architect
You're deeply principled, aligning your decisions with core values and consistency — even at the cost of speed.

**Requirements:**
- integrity ≥ 8
- alignment ≥ 6

**Flaw Tags:**
- agency ≤ -4 → Moral Idealist
- impact ≤ -4 → Low-Leverage Reformer

### 6. 📢 The Popular Reformer
You balance change with public support. You move systems and people — though you may lack depth or rigor.

**Requirements:**
- publicApproval ≥ 8
- impact ≥ 6
- Bonus Tag: trust ≥ 6 → Charismatic Leader

**Flaw Tags:**
- judgment ≤ -3 → Crowd-Pleaser
- clarity ≤ -4 → Message Spinner

### 7. 🧩 The Coherent Thinker
You think in systems. Your decisions are logically and morally aligned, though you may lack agility or outreach.

**Requirements:**
- alignment ≥ 8
- clarity ≥ 6

**Flaw Tags:**
- agency ≤ -4 → Paralysis by Design
- publicApproval ≤ -4 → Invisible Strategist

### 8. 🌀 The Chaos Gambler
You embrace bold moves and rapid action, but your leadership may sow confusion or division.

**Requirements:**
- agency ≥ 8
- stability ≤ -5

**Flaw Tags:**
- trust ≤ -4 → Unpredictable Operator
- judgment ≤ -3 → Intuitive Risk-Taker

### 9. ⚖️ The Generalist
You're balanced and adaptable. No extreme traits — your strength is composure and versatility.

**Requirements:**
- All 9 traits between -3 and +7

**Flaw Tags:**
- None by default
- Optional: tag based on lowest trait (e.g. "Watch your Impact")

## Scenario Structure
Each scenario in `scenarios.json` follows this format:
```json
{
  "id": "unique_id",
  "subject": "Scenario Title",
  "role": "Player's role description",
  "scenario": "Situation description",
  "question": "What would you do?",
  "choices": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "effects": [
    {
      "judgment": 2,
      "stability": -1,
      "agency": 1,
      "trust": 0,
      "impact": 1,
      "integrity": 1,
      "publicApproval": 0,
      "alignment": 1,
      "clarity": 1
    },
    // ... effects for other choices
  ]
}
```

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
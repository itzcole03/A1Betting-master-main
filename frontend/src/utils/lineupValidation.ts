export interface LineupValidationResult {
  canSubmit: boolean;
  errors: string[];
  warnings: string[];
  isValid: boolean;
}

export function validateLineup(
  selectedProps: Map<string, any>,
): LineupValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check minimum props;
  if (propsArray.length < 2) {
    errors.push("Select at least 2 props to create a lineup");
  }

  // Check maximum props;
  if (propsArray.length > 6) {
    errors.push("Maximum 6 props allowed in a lineup");
  }

  // Check for duplicate players;


  if (uniquePlayers.size !== playerNames.length) {
    errors.push("Cannot select multiple props for the same player");
  }

  // Check team diversity (warning)


  if (uniqueTeams.size < Math.min(2, propsArray.length)) {
    warnings.push("Consider diversifying across multiple teams");
  }

  // Check sport diversity (warning)


  if (uniqueSports.size === 1 && propsArray.length > 3) {
    warnings.push("Consider diversifying across multiple sports");
  }

  // Check confidence levels;
  const avgConfidence =
    propsArray.reduce((sum, prop) => sum + (prop.confidence || 0), 0) /
    propsArray.length;
  if (avgConfidence < 60) {
    warnings.push("Low average confidence - consider higher confidence props");
  }

  return {
    canSubmit:
      errors.length === 0 && propsArray.length >= 2 && propsArray.length <= 6,
    errors,
    warnings,
    isValid: errors.length === 0,
  };
}

export function calculateLineupPayout(
  selectedProps: Map<string, any>,
  entryAmount: number,
): number {

  // PrizePicks payout structure;
  const payoutMultipliers = {
    2: 3.0,
    3: 5.0,
    4: 10.0,
    5: 20.0,
    6: 50.0,
  };

  return entryAmount * (payoutMultipliers[propsCount] || 1);
}

export function calculateLineupProbability(
  selectedProps: Map<string, any>,
): number {

  // Calculate combined probability (assuming independence)
  return propsArray.reduce((prob, prop) => {

    return prob * confidence;
  }, 1);
}

export function calculateExpectedValue(
  selectedProps: Map<string, any>,
  entryAmount: number,
): number {


  return payout * probability - entryAmount;
}

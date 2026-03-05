// Helper to generate realistic score breakdowns
// This calculates points based on F1 Pick'em scoring rules

const pointSpread = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export function calculateBreakdown(picks, actualResults) {
  const breakdown = [];
  
  for (let i = 0; i < picks.length && i < 10; i++) {
    const driver = picks[i];
    const pickedPosition = i + 1;
    const actualPosition = actualResults.findIndex(r => r.driver === driver) + 1;
    
    let points = 0;
    if (actualPosition > 0 && actualPosition <= 10) {
      // Calculate points based on position accuracy
      const positionDiff = Math.abs(pickedPosition - actualPosition);
      if (positionDiff === 0) {
        points = pointSpread[pickedPosition - 1];
      } else if (positionDiff === 1) {
        points = Math.floor(pointSpread[pickedPosition - 1] * 0.5);
      } else if (positionDiff === 2) {
        points = Math.floor(pointSpread[pickedPosition - 1] * 0.25);
      }
    }
    
    breakdown.push({
      driver,
      picked_position: pickedPosition,
      actual_position: actualPosition > 0 ? actualPosition : 11,
      points
    });
  }
  
  return breakdown;
}

export function calculateTotalScore(breakdown) {
  return breakdown.reduce((sum, item) => sum + item.points, 0);
}

// Generate varied but realistic picks for different users
export function generatePicksForUser(userId, raceResults, variationLevel = 0) {
  const drivers = raceResults.map(r => r.driver);
  const picks = [...drivers];
  
  // Add some variation based on user and variation level
  for (let i = 0; i < variationLevel; i++) {
    const idx1 = Math.floor(Math.random() * 10);
    const idx2 = Math.floor(Math.random() * 10);
    [picks[idx1], picks[idx2]] = [picks[idx2], picks[idx1]];
  }
  
  return picks;
}

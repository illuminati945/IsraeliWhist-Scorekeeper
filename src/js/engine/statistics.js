/**
 * Israeli Whist Statistics & Analytics Engine
 */

export function calculateGameStatistics(session) {
  const completed = session.completedRounds;
  const numRounds = completed.length;
  const players = session.players;

  const playerStats = players.map((player, pIdx) => {
    let totalScore = 0;
    let madeBidsCount = 0;
    let totalBidsCount = 0;
    let totalBidAmount = 0;
    let totalTricksWon = 0;
    let passAttempts = 0;
    let passSuccess = 0;
    let trumpMakerCount = 0;
    let trumpMakerSuccess = 0;
    let highestSingleRound = -Infinity;
    let lowestSingleRound = Infinity;
    const roundScoresHistory = [0];

    let runningCumulative = 0;

    completed.forEach(round => {
      const res = round.results.find(r => r.playerIndex === pIdx);
      if (res) {
        totalScore += res.score;
        runningCumulative += res.score;
        roundScoresHistory.push(runningCumulative);

        totalBidsCount++;
        totalBidAmount += res.bid || 0;
        totalTricksWon += res.tricks || 0;

        if (res.made) {
          madeBidsCount++;
        }

        if (res.bid === 0) {
          passAttempts++;
          if (res.made) passSuccess++;
        }

        if (round.trump.winnerIndex === pIdx) {
          trumpMakerCount++;
          if (res.made) trumpMakerSuccess++;
        }

        if (res.score > highestSingleRound) highestSingleRound = res.score;
        if (res.score < lowestSingleRound) lowestSingleRound = res.score;
      }
    });

    const hitRate = totalBidsCount > 0 ? (madeBidsCount / totalBidsCount) * 100 : 0;
    const avgTricksPerRound = numRounds > 0 ? (totalTricksWon / numRounds) : 0;
    const avgBidPerRound = totalBidsCount > 0 ? (totalBidAmount / totalBidsCount) : 0;
    const passRate = passAttempts > 0 ? (passSuccess / passAttempts) * 100 : 0;
    const trumpRate = trumpMakerCount > 0 ? (trumpMakerSuccess / trumpMakerCount) * 100 : 0;

    return {
      player,
      pIdx,
      totalScore,
      madeBidsCount,
      totalBidsCount,
      hitRate: Math.round(hitRate * 10) / 10,
      totalTricksWon,
      avgTricksPerRound: Math.round(avgTricksPerRound * 10) / 10,
      avgBidPerRound: Math.round(avgBidPerRound * 10) / 10,
      passAttempts,
      passSuccess,
      passRate: Math.round(passRate * 10) / 10,
      trumpMakerCount,
      trumpMakerSuccess,
      trumpRate: Math.round(trumpRate * 10) / 10,
      highestSingleRound: highestSingleRound === -Infinity ? 0 : highestSingleRound,
      lowestSingleRound: lowestSingleRound === Infinity ? 0 : lowestSingleRound,
      roundScoresHistory
    };
  });

  // Overall Match Stats
  let overRoundsCount = 0;
  let underRoundsCount = 0;
  let pasRoundsCount = 0;

  completed.forEach(r => {
    if (r.trump.isPasRound) pasRoundsCount++;
    else if (r.roundTotalBets > 13) overRoundsCount++;
    else if (r.roundTotalBets < 13) underRoundsCount++;
  });

  // Sort by final score
  const rankings = [...playerStats].sort((a, b) => b.totalScore - a.totalScore);

  return {
    numRounds,
    rankings,
    playerStats,
    overRoundsCount,
    underRoundsCount,
    pasRoundsCount,
    mostAccuratePlayer: [...playerStats].sort((a, b) => b.hitRate - a.hitRate)[0],
    mostAggressiveBidder: [...playerStats].sort((a, b) => b.avgBidPerRound - a.avgBidPerRound)[0],
    masterOfPass: [...playerStats].sort((a, b) => b.passSuccess - a.passSuccess)[0]
  };
}

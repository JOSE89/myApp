
export const addNewFootballGameService = (home, visit) => (
  { home: home, visit: visit, homeGoals: '0', visitGoals: '0' });

export const deleteFootballGameService = soccerMatch => (
  {
    home: soccerMatch.home, visit: soccerMatch.visit,
    homeGoals: soccerMatch.homeGoals, visitGoals: soccerMatch.visitGoals
  });

export const updateFootballGameService = soccerMatch => (
  {
    home: soccerMatch.home, visit: soccerMatch.visit,
    homeGoals: soccerMatch.homeGoals, visitGoals: soccerMatch.visitGoals
  });

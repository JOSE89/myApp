
export const addNewFootballGameService = (home, visit) => (
  {home: home, visit: visit, homeGoals: '0', visitGoals: '0'});

export const deleteFootballGameService = soccerMath => (
    {home: soccerMath.home, visit: soccerMath.visit,
      homeGoals: soccerMath.homeGoals, visitGoals: soccerMath.visitGoals});

export const updateFootballGameService = soccerMath => (
  {home: soccerMath.home, visit: soccerMath.visit,
    homeGoals: soccerMath.homeGoals, visitGoals: soccerMath.visitGoals});

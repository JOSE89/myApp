import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';

export const addNewSoccer = (soccerList, newSoccer) => {
  if (soccerList?.length > 0) {
    let updateSoccerList = cloneDeep(soccerList);
    let updated = false;
    updateSoccerList = updateSoccerList.map(p => {
      if (p.home === newSoccer.home) {
        updated = true;
        return newSoccer;
      } return p;
    });

    if (!updated) {
      updateSoccerList.push(newSoccer);
    }
    return updateSoccerList;
  }
  return [newSoccer];
};

export const updatePanel = soccerList => {
   return (
    orderBy(soccerList.map(s => {
      return (s.homeGoals + s.awayGoals);
    }
    )));
};

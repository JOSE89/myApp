import cloneDeep from 'lodash/cloneDeep';

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

export const deleteSoccerMatch = (soccerList, newSoccer) => {
  if (Array.isArray(soccerList) && soccerList?.length > 0) {
    return soccerList.filter(s => s.home !== newSoccer.home);
  }
  return soccerList;
};

export const updatePanel = (soccerList, editedSoccer) => {
  if (Array.isArray(soccerList) && soccerList?.length > 0) {
    return soccerList.map(soccer => {
      if (soccer.home === editedSoccer.home) {
        return editedSoccer
      } return soccer;
    })
  }
  return [editedSoccer];
};
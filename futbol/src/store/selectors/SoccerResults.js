import {createSelector} from 'reselect';

const getResultsStore = createSelector(state => state.resfreshPanel,
  resfreshPanel => resfreshPanel);

export const getResults = createSelector(getResultsStore,
  resfreshPanel => resfreshPanel.results);

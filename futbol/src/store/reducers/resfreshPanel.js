import {addNewSoccer, updatePanel} from '../../components/helpers/soccerHelper';
import {NEW_FOOTBALLGAME_SUCCEEDED, UPDATED_PANEL_SUCCEEDED} from '../actions/refreshPanelActions';

export const resfreshPanel = (state = {}, action) => {
  switch (action.type) {
    case NEW_FOOTBALLGAME_SUCCEEDED:
      return {
        ...state,
        results: addNewSoccer(state.results, action.result)
      };
    case UPDATED_PANEL_SUCCEEDED:
      return {
        ...state,
        results: updatePanel(state.results)
      };
    default:
      return state;
  }
};

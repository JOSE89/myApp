import {takeEvery, fork, all, put, call} from 'redux-saga/effects';
import {addNewFootballGameService} from '../../services/refreshService';

const NEW_FOOTBALLGAME_REQUESTED = 'NEW_FOOTBALLGAME_REQUESTED';
export const NEW_FOOTBALLGAME_SUCCEEDED = 'NEW_FOOTBALLGAME_SUCCEEDED';
export const createNewFootballGameAction = (home, visit) => ({type: NEW_FOOTBALLGAME_REQUESTED, home, visit});
function* createNewFootballGameEffect() {
  yield takeEvery(NEW_FOOTBALLGAME_REQUESTED, function*({home, visit}) {
    try {
      const result = yield call(addNewFootballGameService, home, visit);
      yield put({type: NEW_FOOTBALLGAME_SUCCEEDED, result});
    } catch (e) {
      console.log(e);
    }
  });
}

const UPDATED_PANEL_REQUESTED = 'UPDATED_PANEL_REQUESTED';
export const UPDATED_PANEL_SUCCEEDED = 'UPDATED_PANEL_SUCCEEDED';
export const updatePanelAction = () => ({type: UPDATED_PANEL_REQUESTED});
function* updatePanelEffect() {
  yield takeEvery(UPDATED_PANEL_REQUESTED, function*() {
    try {
      yield put({type: UPDATED_PANEL_SUCCEEDED});
    } catch (e) {
      console.log(e);
    }
  });
}

export function* resfreshPanelSagas() {
  yield all([
    fork(createNewFootballGameEffect),
    fork(updatePanelEffect)
  ]);
}

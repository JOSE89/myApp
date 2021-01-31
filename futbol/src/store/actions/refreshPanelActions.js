import { takeEvery, fork, all, put, call } from 'redux-saga/effects';
import { addNewFootballGameService, deleteFootballGameService, updateFootballGameService } from '../../services/refreshService';

const NEW_FOOTBALLGAME_REQUESTED = 'NEW_FOOTBALLGAME_REQUESTED';
export const NEW_FOOTBALLGAME_SUCCEEDED = 'NEW_FOOTBALLGAME_SUCCEEDED';
export const createNewFootballGameAction = (home, visit) => ({ type: NEW_FOOTBALLGAME_REQUESTED, home, visit });
function* createNewFootballGameEffect() {
  yield takeEvery(NEW_FOOTBALLGAME_REQUESTED, function* ({ home, visit }) {
    try {
      const result = yield call(addNewFootballGameService, home, visit);
      yield put({ type: NEW_FOOTBALLGAME_SUCCEEDED, result });
    } catch (e) {
      console.log(e);
    }
  });
}

const UPDATED_PANEL_REQUESTED = 'UPDATED_PANEL_REQUESTED';
export const UPDATED_PANEL_SUCCEEDED = 'UPDATED_PANEL_SUCCEEDED';
export const updateFootballGameAction = soccerMatch => ({ type: UPDATED_PANEL_REQUESTED, soccerMatch });
function* updateFootballGameEffect() {
  yield takeEvery(UPDATED_PANEL_REQUESTED, function* ({ soccerMatch }) {
    try {
      const result = yield call(updateFootballGameService, soccerMatch);
      yield put({ type: UPDATED_PANEL_SUCCEEDED, result });
    } catch (e) {
      console.log(e);
    }
  });
}



const DELETE_PANEL_REQUESTED = 'DELETE_PANEL_REQUESTED';
export const DELETE_PANEL_SUCCEEDED = 'DELETE_PANEL_SUCCEEDED';
export const deletePanelAction = soccerMatch => ({ type: DELETE_PANEL_REQUESTED, soccerMatch });
function* deletePanelEffect() {
  yield takeEvery(DELETE_PANEL_REQUESTED, function* ({ soccerMatch }) {
    try {
      const result = yield call(deleteFootballGameService, soccerMatch);
      yield put({ type: DELETE_PANEL_SUCCEEDED, result });
    } catch (e) {
      console.log(e);
    }
  });
}

export function* resfreshPanelSagas() {
  yield all([
    fork(createNewFootballGameEffect),
    fork(updateFootballGameEffect),
    fork(deletePanelEffect)
  ]);
}

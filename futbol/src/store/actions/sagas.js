import {all, fork} from 'redux-saga/effects';
import {resfreshPanelSagas} from './refreshPanelActions';

export default function* root() {
  yield all([
    fork(resfreshPanelSagas)
  ]);
}

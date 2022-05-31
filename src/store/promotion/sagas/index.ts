import { fork } from 'redux-saga/effects';
import getPromotesSagaListener from './getPromotion';

function* promoteSaga() {
  yield fork(getPromotesSagaListener);
}

export default promoteSaga;

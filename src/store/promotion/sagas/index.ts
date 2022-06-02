import { fork } from 'redux-saga/effects';
import buyPromotesSagaListener from './buyPromotion';
import getPromotesSagaListener from './getPromotion';

function* promoteSaga() {
  yield fork(getPromotesSagaListener);
  yield fork(buyPromotesSagaListener);
}

export default promoteSaga;

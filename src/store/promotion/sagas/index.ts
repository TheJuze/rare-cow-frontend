import { fork } from 'redux-saga/effects';
import getPromotesSagaListener from './getPromotion';

function* ratesSagas() {
  yield fork(getPromotesSagaListener);
}

export default ratesSagas;

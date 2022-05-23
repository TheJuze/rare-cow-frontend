import { fork } from 'redux-saga/effects';
import getRatesSagaListener from './getRates';

function* ratesSagas() {
  yield fork(getRatesSagaListener);
}

export default ratesSagas;

import { fork } from 'redux-saga/effects';

import getTokenBalance from './getTokenBalance';

export default function* userSagas() {
  yield fork(getTokenBalance);
}

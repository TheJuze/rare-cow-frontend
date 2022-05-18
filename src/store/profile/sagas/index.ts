import { fork } from 'redux-saga/effects';
import editProfileInfoSagaListener from './editProfileInfo';

import getProfile from './getProfileById';

export default function* profileSagas() {
  yield fork(getProfile);
  yield fork(editProfileInfoSagaListener);
}

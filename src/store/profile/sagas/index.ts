import { fork } from 'redux-saga/effects';
import editProfileInfoSagaListener from './editProfileInfo';
import follow from './follow';
import unfollow from './unfollow';

import getProfile from './getProfileById';

export default function* profileSagas() {
  yield fork(getProfile);
  yield fork(editProfileInfoSagaListener);
  yield fork(unfollow);
  yield fork(follow);
}

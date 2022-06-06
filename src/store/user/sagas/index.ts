import { fork } from 'redux-saga/effects';

import getTokenBalance from './getTokenBalance';
import login from './login';
import updateUserInfo from './updateUserInfo';
import getSelfCollections from './getSelfCollections';
import updateTheme from './updateTheme';

export default function* userSagas() {
  yield fork(getTokenBalance);
  yield fork(login);
  yield fork(updateUserInfo);
  yield fork(getSelfCollections);
  yield fork(updateTheme);
}

import { fork } from 'redux-saga/effects';
import userSaga from 'store/user/sagas';
import nftSagas from './nfts/sagas';
import collectionsSaga from './collections/sagas';
import profileSaga from './profile/sagas';
import ratesSagas from './rates/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(nftSagas);
  yield fork(collectionsSaga);
  yield fork(profileSaga);
  yield fork(ratesSagas);
}

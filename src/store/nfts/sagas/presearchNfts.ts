import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { camelize } from 'utils/camelize';

import { TokenFull } from 'types/api/TokenFull';
import { setPresearchedNfts } from '../reducer';

import { presearchNfts } from '../actions';
import actionTypes from '../actionTypes';

export function* presearchNftsSaga({
  type,
  payload: { presearch },
}: ReturnType<typeof presearchNfts>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.presearchNfts, { presearch });
    const camelizedResult = camelize(data) as TokenFull[];

    yield put(setPresearchedNfts(camelizedResult));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.PRESEARCH_NFTS, presearchNftsSaga);
}

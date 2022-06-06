import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { TokenFull } from 'types/api';
import { camelize } from 'utils';
import { getPremium } from '../actions';
import nftActionTypes from '../actionTypes';
import { setPremium } from '../reducer';

export function* getPremiumSaga({ type }: ReturnType<typeof getPremium>) {
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.getPremiumNFTs);

    yield put(setPremium(camelize(data) as TokenFull[]));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

function* getPremiumSagaListener() {
  yield takeLatest(nftActionTypes.GET_PREMIUM, getPremiumSaga);
}

export default getPremiumSagaListener;

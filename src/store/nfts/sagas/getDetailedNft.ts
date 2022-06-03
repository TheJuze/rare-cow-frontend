/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { camelize } from 'utils/camelize';

import { TokenFull } from 'types/api/TokenFull';
import { setDetailedNft } from '../reducer';

import { getDetailedNft } from '../actions';
import actionTypes from '../actionTypes';
import nftSelector from '../selectors';

export function* getDetailedNftSaga({ type, payload: { id } }: ReturnType<typeof getDetailedNft>) {
  yield put(apiActions.request(type));
  try {
    const featuredId = yield select(nftSelector.getProp('featuredId'));
    const { data } = yield call(baseApi.getTokenById, { id, featuredId });

    yield put(setDetailedNft(camelize(data) as TokenFull));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_DETAILED_NFT, getDetailedNftSaga);
}

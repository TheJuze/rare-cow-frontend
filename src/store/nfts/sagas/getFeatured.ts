import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { TokenFull } from 'types/api';
import { camelize } from 'utils';
import { getFeatured } from '../actions';
import nftActionTypes from '../actionTypes';
import { setFeatured } from '../reducer';

export function* getFeaturedSaga({ type }: ReturnType<typeof getFeatured>) {
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.getFeaturedNFTs);

    yield put(setFeatured(camelize(data) as TokenFull[]));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

function* getFeaturedSagaListener() {
  yield takeLatest(nftActionTypes.GET_FEATURED, getFeaturedSaga);
}

export default getFeaturedSagaListener;

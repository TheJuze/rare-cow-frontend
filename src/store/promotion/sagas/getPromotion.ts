/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { PromotionSettings } from 'types/api/PromotionSettings';

import { camelize } from 'utils/camelize';
import { getPromotions } from '../actions';
import promoteActionTypes from '../actionTypes';
import { setPromoteState } from '../reducer';

export function* getPromotesSaga({ type }: ReturnType<typeof getPromotions>) {
  yield put(request(type));
  try {
    const { data } = yield call(baseApi.getPromotes);
    const camelizeData = camelize(data.results);
    yield put(setPromoteState(camelizeData as PromotionSettings[]));
    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

function* getPromotesSagaListener() {
  yield takeLatest(promoteActionTypes.SET_PROMOTION_OPTION, getPromotesSaga);
}

export default getPromotesSagaListener;
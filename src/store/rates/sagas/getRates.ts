/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { Rates } from 'types/api';

import { camelize } from 'utils/camelize';
import { getRates } from '../actions';
import actionTypes from '../actionTypes';
import { updateRates } from '../reducer';

export function* getRatesSaga({ type, payload }: ReturnType<typeof getRates>) {
  yield put(request(type));
  try {
    const { data } = yield call(baseApi.getRates, payload);
    const camelizeData = camelize(data.results);
    yield put(updateRates(Array.isArray(camelizeData) ? camelizeData : [] as Rates[]));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

function* getRatesSagaListener() {
  yield takeLatest(actionTypes.GET_RATES, getRatesSaga);
}

export default getRatesSagaListener;

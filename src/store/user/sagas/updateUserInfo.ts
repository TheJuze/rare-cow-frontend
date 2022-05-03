/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { camelize } from 'utils/camelize';

import { currencies } from 'appConstants';
import { getTokenBalance, updateUserInfo } from '../actions';
import actionTypes from '../actionTypes';
import { disconnectWalletState, updateUserState } from '../reducer';

export function* updateUserInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof updateUserInfo>) {
  yield put(request(type));
  try {
    console.log('fetching user');
    const { data } = yield call(baseApi.getSelfInfo);
    yield put(getTokenBalance({ web3Provider, address: data.address, token: currencies[0] }));

    yield put(updateUserState(camelize(data)));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.UPDATE_USER_INFO, updateUserInfoSaga);
}

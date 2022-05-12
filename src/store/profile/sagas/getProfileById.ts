/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getTokenBalance } from 'store/user/actions';

import { camelize } from 'utils/camelize';
import { updateProfile } from '../reducer';

import { getProfileById } from '../actions';
import profileActionTypes from '../actionsTypes';

export function* updateProfileInfoSaga({
  type,
  payload: { web3Provider, id },
}: ReturnType<typeof getProfileById>) {
  yield put(request(type));
  try {
    const { data } = yield call(baseApi.getProfileInfo, { id });
    yield put(
      getTokenBalance({
        web3Provider,
        address: data.address,
        token: { name: 'MATIC', isNative: true },
      }),
    );
    yield put(
      getTokenBalance({
        web3Provider,
        address: data.address,
        token: { name: 'USDT', isNative: false },
      }),
    );

    // TODO: delete this mock
    const testData = {
      ...data,
      email: 'rarecow@mail.com',
      site: 'rarecow.io',
      twitter: 'rarecow',
      instagram: 'rarecow',
    };
    yield put(updateProfile(camelize(testData)));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(profileActionTypes.GET_PROFILE, updateProfileInfoSaga);
}

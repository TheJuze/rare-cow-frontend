/* eslint-disable max-len */
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getTokenBalance } from 'store/user/actions';

import { camelize } from 'utils/camelize';
import { currencies } from 'appConstants';
import { setIsUser } from 'store/user/reducer';
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
    yield put(setIsUser(+data.id));
    const tokensBalances = currencies.map((currency) => put(getTokenBalance({
      web3Provider,
      address: data.address,
      token: currency,
      setter: 'profile',
    })));

    yield all(tokensBalances);

    yield put(updateProfile(camelize(data)));

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

function* updateProfileInfoSagaListener() {
  yield takeLatest(profileActionTypes.GET_PROFILE, updateProfileInfoSaga);
}

export default updateProfileInfoSagaListener;

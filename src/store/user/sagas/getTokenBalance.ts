/* eslint-disable max-len */
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';

import { ContractsNames, generateContract } from 'config';
import { getTokenAmountDisplay } from 'utils';

import { updateProfileBalance } from 'store/profile/reducer';
import { updateBalance } from '../reducer';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';

const setterMap = {
  user: updateBalance,
  profile: updateProfileBalance,
};

export function* getTokenBalanceSaga({
  type,
  payload: {
    web3Provider, token, address, setter = 'user',
  },
}: ReturnType<typeof getTokenBalance>) {
  yield put(apiActions.request(type));
  if(address) {
    try {
      if (!token.isNative) {
        const tokenContract = yield generateContract({
          web3Provider,
          contractName: ContractsNames[token.name],
        });

        const balance = yield call(tokenContract.methods.balances(address).call);
        const decimals = yield call(tokenContract.methods.decimals().call);
        yield put(setterMap[setter]({ [token.name]: getTokenAmountDisplay(balance, decimals) }));

        yield put(apiActions.success(type));
      } else {
        const nativeBalance = yield call(() => web3Provider.eth.getBalance(address));
        yield put(setterMap[setter]({ MATIC: getTokenAmountDisplay(nativeBalance, 18) }));
      }
    } catch (err) {
      yield put(apiActions.error(type, err));
    }
  }
  yield put(apiActions.error(type, 'user not connected'));
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}

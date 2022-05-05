/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import userSelector from 'store/user/selectors';

import { ContractsNames, generateContract } from 'config';
import { getTokenAmountDisplay } from 'utils';

import { updateUserState } from '../reducer';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';

export function* getTokenBalanceSaga({
  type,
  payload: { web3Provider, token },
}: ReturnType<typeof getTokenBalance>) {
  if (!token.isNative) {
    yield put(apiActions.request(type));
    const myAddress = yield select(userSelector.getProp('address'));
    try {
      const tokenContract = yield generateContract({
        web3Provider,
        contractName: ContractsNames[token.name],
      });

      if (myAddress) {
        const balance = yield call(tokenContract.methods.balanceOf(myAddress).call);
        const decimals = yield call(tokenContract.methods.decimals().call);

        yield put(updateUserState({ balance: getTokenAmountDisplay(balance, decimals) }));
      }

      yield put(apiActions.success(type));
    } catch (err) {
      console.log(err);
      yield put(apiActions.error(type, err));
    }
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}

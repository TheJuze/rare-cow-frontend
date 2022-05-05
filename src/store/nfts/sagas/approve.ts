/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Modals } from 'types';

import BigNumber from 'bignumber.js';
import { ContractsNames, generateContract, getContractInfo } from 'config';
import { approve } from '../actions';
import actionTypes from '../actionTypes';

export function* approveSaga({
  type,
  payload: {
    amount, spender, approveAddress, web3Provider, currency,
  },
}: ReturnType<typeof approve>) {
  yield put(apiActions.request(type));

  const myAddress = yield select(userSelector.getProp('address'));

  const tokenContract = yield generateContract({
    web3Provider,
    contractName: approveAddress,
  });

  const { address: spenderAddress } = getContractInfo({
    contractName: spender,
    reqInfo: 'address',
  });

  if (!currency.isNative) {
    try {
      const allowance = yield call(tokenContract.methods.allowance(myAddress, spenderAddress).call);
      if (+allowance < +amount) {
        // allowance
        try {
          yield call(
            tokenContract.methods.approve(spender, new BigNumber(amount).toString()).send,
            {
              from: myAddress,
            },
          );
          yield put(apiActions.success(type));
        } catch (e: unknown) {
          yield put(apiActions.error(type, e));
          throw e;
        }
      }
    } catch (e) {
      yield put(apiActions.error(type, e));
      throw e;
    }
  } else {
    try {
      yield call(tokenContract.methods.approve(spender).send, {
        from: myAddress,
        value: new BigNumber(amount).toString(),
      });
      yield put(apiActions.success(type));
    } catch (e: unknown) {
      yield put(apiActions.error(type, e));
      throw e;
    }
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}

/* eslint-disable max-len */
import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { ContractsNames, generateContract } from 'config';
import { getTokenAmount } from 'utils';

import { setActiveModal } from 'store/modals/reducer';
import { Modals } from 'types';
import { bid } from '../actions';
import actionTypes from '../actionTypes';
import { approveSaga } from './approve';
import { getDetailedNftSaga } from './getDetailedNft';

export function* bidNftSaga({
  type,
  payload: {
    id, currency, amount, web3Provider,
  },
}: ReturnType<typeof bid>) {
  yield put(apiActions.request(type));

  try {
    const tokenContract = yield generateContract({
      web3Provider,
      // TODO: change if there will be more currencies
      contractName: ContractsNames.USDT,
    });
    const decimals = yield call(tokenContract.methods.decimals().call);
    yield call(approveSaga, {
      type: actionTypes.APPROVE,
      payload: {
        web3Provider,
        amount: getTokenAmount(amount, decimals),
        spender: ContractsNames.marketplace,
        approveAddress: currency.isNative ? '' : ContractsNames[currency.name],
        currency,
      },
    });

    yield call(baseApi.bid, {
      token_id: id,
      amount,
      currency: currency.name,
    });

    yield call(getDetailedNftSaga, {
      type: actionTypes.GET_DETAILED_NFT,
      payload: {
        id,
      },
    });
    toast.success('Success bid');
    yield put(apiActions.success(type));
  } catch (err: unknown) {
    if (typeof err !== 'number') {
      yield put(
        setActiveModal({
          activeModal: err === 4001 ? Modals.SendRejected : Modals.SendError,
          open: true,
          txHash: '',
        }),
      );
    } else {
      yield put(
        setActiveModal({
          activeModal: Modals.SendError,
          open: true,
          txHash: '',
        }),
      );
    }
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BID, bidNftSaga);
}

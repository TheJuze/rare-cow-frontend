/* eslint-disable max-len */
import { toast } from 'react-toastify';

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';

import { ContractsNames } from 'config';
import { getTokenAmount } from 'utils';

import { Modals } from 'types';

import { buy } from '../actions';
import actionTypes from '../actionTypes';
import { approveSaga } from './approve';
import { getDetailedNftSaga } from './getDetailedNft';

export function* buySaga({
  type,
  payload: {
    id, amount, tokenAmount, sellerId, web3Provider, currency,
  },
}: ReturnType<typeof buy>) {
  yield put(apiActions.request(type));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const address = yield select(userSelector.getProp('address'));
  try {
    yield call(approveSaga, {
      type: actionTypes.APPROVE,
      payload: {
        web3Provider,
        amount: getTokenAmount(
          new BigNumber(amount).times(new BigNumber(tokenAmount || 1)).toFixed(),
        ),
        spender: ContractsNames.marketplace,
        approveAddress: currency.isNative ? '' : ContractsNames[currency.name],
        currency,
      },
    });

    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );

    const { data } = yield call(baseApi.buy, { id, tokenAmount, sellerId });

    if (data.initial_tx) {
      const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
        ...data.initial_tx,
        from: address,
      });

      yield call(baseApi.trackTransaction, {
        tx_hash: String(transactionHash),
        token: id,
        ownership: sellerId,
        amount,
      });

      yield call(getDetailedNftSaga, {
        type: actionTypes.GET_DETAILED_NFT,
        payload: {
          id,
        },
      });

      // yield put(
      //   setActiveModal({
      //     activeModal: Modals.SendSuccess,
      //     open: true,
      //     txHash: transactionHash,
      //   }),
      // );

      yield put(apiActions.success(type));
    } else {
      toast.error('Something went wrong');
    }
  } catch (e: unknown) {
    yield call(baseApi.buyReject, {
      id,
      owner: sellerId,
    });
    // if (typeof e === 'number') {
    //   yield put(
    //     setActiveModal({
    //       activeModal: e === 4001 ? Modals.SendRejected : Modals.SendError,
    //       open: true,
    //       txHash: '',
    //     }),
    //   );
    // } else {
    //   yield put(
    //     setActiveModal({
    //       activeModal: e.code === 4001 ? Modals.SendRejected : Modals.SendError,
    //       open: true,
    //       txHash: '',
    //     }),
    //   );
    // }

    yield put(apiActions.error(type, e));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BUY, buySaga);
}

/* eslint-disable max-len */
import { toast } from 'react-toastify';

import {
  call, put, select, take, takeLatest,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';

import { ContractsNames, generateContract } from 'config';
import { getTokenAmount } from 'utils';

import { Modals } from 'types';

import { buy } from '../actions';
import actionTypes from '../actionTypes';
import { approveSaga } from './approve';
import { getDetailedNftSaga } from './getDetailedNft';

function createTxChannel({ txObject, web3 }) {
  let event;
  return eventChannel((emit) => {
    const txPromiEvent = web3.eth
      .sendTransaction(txObject)
      .on('transactionHash', (txHash) => {
        event = { payload: txHash, type: 'transactionHash' };
        emit(event);
      })
      .on('confirmation', () => {
        event = { payload: true, type: 'confirmation' };
        emit(event);
      });
    const unsubscribe = () => {
      txPromiEvent.off();
    };
    return unsubscribe;
  });
}
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
    if (!currency.isNative) {
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
          amount: getTokenAmount(
            new BigNumber(amount).times(new BigNumber(+tokenAmount || 1)).toFixed(), decimals,
          ),
          spender: ContractsNames.marketplace,
          approveAddress: ContractsNames[currency.name],
          currency,
        },
      });
    }

    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );
    const { data } = yield call(baseApi.buy, {
      id,
      tokenAmount,
      sellerId,
      currency: currency.name,
    });

    const txObject = {
      ...data.initial_tx,
      from: address,
    };
    const txChannel = yield call(createTxChannel, { txObject, web3: web3Provider });
    let txHash;

    if (data.initial_tx) {
      while (true) {
        const event = yield take(txChannel);
        if(event.type === 'transactionHash') {
          txHash = event.payload;
          yield call(baseApi.trackTransaction, {
            tx_hash: String(event.payload),
            token: id,
            ownership: sellerId,
            amount: tokenAmount,
          });
        }
        if (event.type === 'confirmation') {
          break;
        }
      }

      yield call(getDetailedNftSaga, {
        type: actionTypes.GET_DETAILED_NFT,
        payload: {
          id,
        },
      });

      yield put(
        setActiveModal({
          activeModal: Modals.SendSuccess,
          open: true,
          txHash,
        }),
      );

      yield put(apiActions.success(type));
    } else {
      toast.error('Something went wrong');
    }
  } catch (e: unknown) {
    yield call(baseApi.buyReject, {
      id,
      type: 'token',
      owner: sellerId,
    });
    if (typeof e !== 'number') {
      yield put(
        setActiveModal({
          activeModal: e === 4001 ? Modals.SendRejected : Modals.SendError,
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

    yield put(apiActions.error(type, e));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BUY, buySaga);
}

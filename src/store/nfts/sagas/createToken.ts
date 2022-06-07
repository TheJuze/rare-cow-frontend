/* eslint-disable @typescript-eslint/naming-convention */
import { toast } from 'react-toastify';

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import { updateUserInfo } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { Modals } from 'types';

import { createToken } from '../actions';
import actionTypes from '../actionTypes';
import { approveNftSaga } from './approveNft';

export function* createTokenSaga({
  type,
  payload: {
    token, web3, listingInfo, onEnd, onSuccess,
  },
}: ReturnType<typeof createToken>) {
  yield put(apiActions.request(type));
  yield put(
    setActiveModal({
      activeModal: Modals.SendPending,
      open: true,
      txHash: '',
    }),
  );

  try {
    const {
      listType, price, listNow, timestamp, currency,
    } = listingInfo;
    const now = parseInt(String(Date.now() / 1000), 10);
    if (listNow) {
      token.append('selling', String(true));
      token.append('currency', currency.name);
      if (listType === 'Price') {
        token.append('price', price);
      }
      if (listType === 'Auction' || listType === 'Auction time') {
        token.append('minimal_bid', price);
        if (listType === 'Auction time') {
          token.append('start_auction', String(now));
          token.append('end_auction', String(now + timestamp));
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = yield call(baseApi.createNewToken, token as any);

    const address = yield select(userSelector.getProp('address'));
    const { initial_tx, token: createdToken } = data;
    if(listNow) {
      try{
        yield call(approveNftSaga, {
          type: actionTypes.APPROVE_NFT,
          payload: {
            id: createdToken.id,
            isSingle: createdToken.standart === 'ERC721',
            web3Provider: web3,
            currency,
            collectionAddress: createdToken.collection?.address,
          },
        });
      }catch(e) {
        toast.error('Something went wrong');
        yield put(
          setActiveModal({
            activeModal: e.code === 4001 ? Modals.SendRejected : Modals.SendError,
            open: true,
            txHash: '',
          }),
        );
      }
    }
    if (initial_tx) {
      yield put(
        setActiveModal({
          activeModal: Modals.SendPending,
          open: true,
          txHash: '',
        }),
      );
      try {
        const { transactionHash } = yield call(web3.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });
        if (transactionHash) {
          onSuccess?.();
          toast.success('Collection created successfully');
        }
        yield put(
          setActiveModal({
            activeModal: Modals.SendSuccess,
            open: true,
            txHash: transactionHash,
          }),
        );
        yield put(apiActions.success(type));
      } catch (e) {
        console.log('error', e);
        yield call(baseApi.mintReject, {
          id: createdToken.id,
          type: 'token',
          owner: createdToken.creator.url,
        });
        yield put(
          setActiveModal({
            activeModal: e.code === 4001 ? Modals.SendRejected : Modals.SendError,
            open: true,
            txHash: '',
          }),
        );
        // throw new Error(e);
      }

      yield put(apiActions.error(type));
    } else {
      toast.error('Something went wrong');
      yield put(apiActions.error(type));
    }
  } catch (err) {
    toast.error('Something went wrong');
    yield put(
      setActiveModal({
        activeModal: err.code === 4001 ? Modals.SendRejected : Modals.SendError,
        open: true,
        txHash: '',
      }),
    );
    yield put(apiActions.error(type, err));
    console.log(err);
  } finally {
    yield put(updateUserInfo({ web3Provider: web3 }));
  }
  onEnd?.();
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN, createTokenSaga);
}

/* eslint-disable @typescript-eslint/naming-convention */
import { initialListingOptions } from 'components';
import { toast } from 'react-toastify';

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Modals } from 'types';
import { Token } from 'types/api';

import { createToken, setOnAuction, setOnSale } from '../actions';
import actionTypes from '../actionTypes';

export function* createTokenSaga({
  type,
  payload: {
    token, web3, listingInfo, onEnd,
  },
}: ReturnType<typeof createToken>) {
  // yield put(
  //   setActiveModal({
  //     activeModal: Modals.SendPending,
  //     open: true,
  //     txHash: '',
  //   }),
  // );
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.createNewToken, token as unknown as Token);

    const address = yield select(userSelector.getProp('address'));
    const { initial_tx, token: createdToken } = data;
    if (initial_tx) {
      try {
        const { transactionHash } = yield call(web3.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });
        if (listingInfo.listNow && createdToken) {
          try {
            switch (initialListingOptions[listingInfo.listType]) {
              case 'Price': {
                yield call(setOnSale, {
                  id: createdToken.id,
                  internalId: createdToken.id,
                  price: listingInfo.price,
                  isSingle: createdToken.standart === 'ERC721',
                  amount: createdToken.total_supply,
                  web3Provider: web3,
                  currency: listingInfo.currency,
                });
                break;
              }
              case 'Auction': {
                yield call(setOnAuction, {
                  id: createdToken.id,
                  internalId: createdToken.id,
                  minimalBid: listingInfo.price,
                  isSingle: createdToken.standart === 'ERC721',
                  web3Provider: web3,
                  auctionDuration: null,
                  currency: listingInfo.currency,
                });
                break;
              }
              case 'Auction time': {
                yield call(setOnAuction, {
                  id: createdToken.id,
                  internalId: createdToken.id,
                  minimalBid: listingInfo.price,
                  isSingle: createdToken.standart === 'ERC721',
                  web3Provider: web3,
                  auctionDuration: listingInfo.timestamp,
                  currency: listingInfo.currency,
                });
                break;
              }
              default: {
                break;
              }
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
            throw new Error(e);
          }
        } else {
          yield put(
            setActiveModal({
              activeModal: Modals.SendSuccess,
              open: true,
              txHash: transactionHash,
            }),
          );
          yield put(apiActions.success(type));
        }
      } catch (e: unknown) {
        yield call(baseApi.mintReject, {
          id: createdToken.id,
          type: 'token',
          owner: createdToken.creator.url,
        });
        // yield put(
        //   setActiveModal({
        //     activeModal: e.code === 4001 ? Modals.SendRejected : Modals.SendError,
        //     open: true,
        //     txHash: '',
        //   }),
        // );

        yield put(apiActions.error(type, e));
      }
    } else {
      toast.error('Something went wrong');
      yield put(apiActions.error(type));
    }
  } catch (err) {
    toast.error('Something went wrong');
    yield put(apiActions.error(type, err));
    console.log(err);
  }
  onEnd?.();
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN, createTokenSaga);
}

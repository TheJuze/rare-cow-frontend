/* eslint-disable max-len */
import BigNumber from 'bignumber.js';
import { ContractsNames } from 'config';
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import actionTypes from 'store/nfts/actionTypes';
import { approveSaga } from 'store/nfts/sagas/approve';
import { getDetailedNftSaga } from 'store/nfts/sagas/getDetailedNft';
import userSelector from 'store/user/selectors';
import { Chains, Modals } from 'types';
import { Rates } from 'types/api';
import { camelize, getTokenAmount } from 'utils';

import { buyPromotion } from '../actions';
import promoteActionTypes from '../actionTypes';

export function* buyPromotesSaga({ type, payload }: ReturnType<typeof buyPromotion>) {
  yield put(request(type));
  try {
    const {
      tokenId, web3Provider, currency, priceInUsd,
    } = payload;
    if (!currency.isNative) {
      const { data } = yield call(baseApi.getRates, { network: Chains.polygon });
      const latestRates = camelize(data) as Rates[];
      const tokenPrice = latestRates.find((rate) => rate.name === currency.name);
      if (tokenPrice) {
        const priceInTokens = new BigNumber(priceInUsd).div(tokenPrice.rate).multipliedBy(1.05);
        yield call(approveSaga, {
          type: actionTypes.APPROVE,
          payload: {
            web3Provider,
            amount: String(+getTokenAmount(new BigNumber(priceInTokens).toFixed())),
            spender: ContractsNames.promotion,
            approveAddress: ContractsNames[currency.name],
            currency,
          },
        });
      }
    }
    const { data } = yield call(baseApi.payPromotes, {
      token_id: tokenId,
      currency: currency.name,
      package: payload['package'],
    });
    const userAddress: string = yield select(userSelector.getProp('address'));
    if (data) {
      const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
        ...data,
        from: userAddress,
      });
      yield call(getDetailedNftSaga, {
        type: actionTypes.GET_DETAILED_NFT,
        payload: {
          id: tokenId,
        },
      });

      yield put(
        setActiveModal({
          activeModal: Modals.SendSuccess,
          open: true,
          txHash: transactionHash,
        }),
      );
      yield put(success(type));
    }
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

function* buyPromotesSagaListener() {
  yield takeLatest(promoteActionTypes.BUY_PROMOTION, buyPromotesSaga);
}

export default buyPromotesSagaListener;

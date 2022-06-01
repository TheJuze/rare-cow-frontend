/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import actionTypes from 'store/nfts/actionTypes';
import { getDetailedNftSaga } from 'store/nfts/sagas/getDetailedNft';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';

import { buyPromotion } from '../actions';
import promoteActionTypes from '../actionTypes';

export function* buyPromotesSaga({ type, payload }: ReturnType<typeof buyPromotion>) {
  yield put(request(type));
  try {
    const {
      tokenId, web3Provider, currency,
    } = payload;
    const { data } = yield call(baseApi.payPromotes, { token_id: tokenId, currency: currency.name, package: payload['package'] });
    const userAddress: string = yield select(userSelector.getProp('address'));
    if (data) {
      if(!currency.isNative) {
        // yield call(approveNftSaga, {
        //   type: actionTypes.APPROVE,
        //   payload: {
        //     web3Provider,
        //     amount: getTokenAmount(
        //       new BigNumber(amount).times(new BigNumber(tokenAmount || 1)).toFixed(),
        //     ),
        //     spender: ContractsNames.marketplace,
        //     approveAddress: ContractsNames[currency.name],
        //     currency,
        //   },
        // });
      }
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

/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { ContractsNames, generateContract, getContractInfo } from 'config';

import { Modals } from 'types';

import { approveNft } from '../actions';
import actionTypes from '../actionTypes';

export function* approveNftSaga({
  type,
  payload: { isSingle, web3Provider },
}: ReturnType<typeof approveNft>) {
  yield put(apiActions.request(type));

  const myAddress = yield select(userSelector.getProp('address'));
  try {
    const { address: marketplaceAddress } = getContractInfo({
      contractName: ContractsNames.marketplace,
      reqInfo: 'address',
    });

    const nftContract = yield generateContract({
      web3Provider,
      contractName: isSingle ? ContractsNames.erc721 : ContractsNames.erc1155,
    });

    const isApproved = yield call(
      nftContract.methods.isApprovedForAll(myAddress, marketplaceAddress).call,
    );
    if (isApproved) {
      yield put(apiActions.success(type));
      return;
    }

    yield put(
      setActiveModal({
        activeModal: Modals.ApprovePending,
        open: true,
        txHash: '',
      }),
    );

    yield call(nftContract.methods.setApprovalForAll(marketplaceAddress, true).send, {
      from: myAddress,
    });

    yield put(apiActions.success(type));
  } catch (err: unknown) {
    // yield put(
    //   setActiveModal({
    //     activeModal: err.code === 4001 ? Modals.ApproveRejected : Modals.ApproveError,
    //     open: true,
    //     txHash: '',
    //   }),
    // );

    yield put(apiActions.error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE_NFT, approveNftSaga);
}

/* eslint-disable max-len */
import BigNumber from 'bignumber.js';
import { generateContract, ContractsNames, MATIC_ADDRESS } from 'config';
import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import userSelector from 'store/user/selectors';

import { getFeeInfo } from '../actions';
import actionTypes from '../actionTypes';
import { setFees } from '../reducer';

export function* feeInfoSaga({
  type,
  payload: { web3Provider, standard = 'ERC721', type: actionType = 'create' },
}: ReturnType<typeof getFeeInfo>) {
  yield put(apiActions.request(type));

  try {
    if (actionType === 'buy') {
      const marketplaceContract = yield generateContract({
        web3Provider,
        contractName: ContractsNames.marketplace,
      });
      const feeDenominator = yield call(marketplaceContract.methods.PERCENT_DENOMINATOR().call);
      const feeAmount = yield call(marketplaceContract.methods.feePercentage().call);
      const feeReceiver = yield call(marketplaceContract.methods.feeReceiver().call);
      yield put(
        setFees({
          amount: new BigNumber(feeAmount).div(feeDenominator).toString(),
          receiver: feeReceiver,
        }),
      );
    } else {
      const userAddress = yield select(userSelector.getProp('address'));
      const factoryContract = yield generateContract({
        web3Provider,
        contractName: standard === 'ERC1155' ? ContractsNames.erc1155 : ContractsNames.erc721,
      });
      const fee = yield call(factoryContract.methods.pricePerMint(MATIC_ADDRESS, userAddress).call);
      const decimals = 10 ** 18;
      yield put(
        setFees({
          amount: new BigNumber(fee).div(decimals).toString(),
          receiver: '',
        }),
      );
    }

    yield put(apiActions.success(type));
  } catch (err: unknown) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_FEE_INFO, feeInfoSaga);
}

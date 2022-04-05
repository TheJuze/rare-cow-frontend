import { call, put, select, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import userSelector from 'store/user/selectors';

import { contractsConfig, ContractsNames } from 'config';
import { getTokenAmountDisplay } from 'utils';

import { Chains } from 'types';
import { updateUserState } from '../reducer';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';

export function* getTokenBalanceSaga({ type, payload: { web3Provider, chainType } }: ReturnType<typeof getTokenBalance>) {
  yield put(apiActions.request(type));
  const { abi: tokenAbi, address: tokenAddress } = contractsConfig.contracts[ContractsNames.token][chainType === 'mainnet' ? 'mainnet' : 'testnet'];

  const myAddress = yield select(userSelector.getProp('address'));
  try {
    const tokenContract = yield new web3Provider.eth.Contract(tokenAbi, tokenAddress[Chains.bsc]);
    if (myAddress) {
      const balance = yield call(tokenContract.methods.balanceOf(myAddress).call);
      const decimals = yield call(tokenContract.methods.decimals().call);

      yield put(updateUserState({ balance: getTokenAmountDisplay(balance, decimals) }));
    }

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}

import { toast } from 'react-toastify';

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userSelector from 'store/user/selectors';

import { createCollection } from '../actions';
import actionTypes from '../actionTypes';

export function* createCollectionSaga({ type, payload }: ReturnType<typeof createCollection>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.createNewCollection, payload);
    if (data.detail) {
      Object.values(data).forEach((err) => {
        toast.error(err);
      });
      yield put(apiActions.error(type));
    } else {
      const address = yield select(userSelector.getProp('address'));
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { initial_tx, collection } = data;
      try {
        const { transactionHash } = yield call(payload.web3Provider.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });
        if (transactionHash) {
          toast.success('Collection created successfully');
          yield put(apiActions.success(type));
        }
      } catch (err) {
        const id = yield select(userSelector.getProp('id'));
        yield call(baseApi.mintReject, {
          id: collection.url,
          type: 'collection',
          owner: id,
        });
        throw new Error(err);
      }
    }
  } catch (err) {
    toast.error('Something went wrong');
    console.error(err);
    yield put(apiActions.error(type, err));
  }
  payload.onEnd?.();
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_COLLECTION, createCollectionSaga);
}

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import nftSelector from 'store/nfts/selectors';

import { camelize } from 'utils/camelize';

import { TokenFull } from 'types/api/TokenFull';
import { Category } from 'types/api';
import { SearchNftReq } from 'types/requests';
import { setNfts, setSearchValues, setTotalPages } from '../reducer';

import { search } from '../actions';
import actionTypes from '../actionTypes';

export function* searchSaga({
  type,
  payload: { requestData, shouldConcat },
}: ReturnType<typeof search>) {
  yield put(apiActions.request(type));
  const { type: searchType } = requestData;
  try {
    switch (searchType) {
      case 'categories': {
        const { data } = yield call(baseApi.getCategories, { name: requestData.text });
        const normilizedData = camelize(data) as Category[];
        yield put(setSearchValues({ key: 'categories', values: normilizedData }));
        break;
      }
      case 'items': {
        const { data } = yield call(baseApi.searchNfts, {
          ...requestData,
          type: 'items',
        } as SearchNftReq);
        const nfts = yield select(nftSelector.getProp('nfts'));

        const camelizedResult = camelize(data.results) as TokenFull[];

        yield put(setNfts(shouldConcat ? [...nfts, ...camelizedResult] : camelizedResult));
        yield put(setTotalPages(data.total_pages));
        break;
      }
      case 'collections':
      case 'users': {
        const { data } = yield call(baseApi.searchNfts, {
          ...requestData,
          type: searchType,
        } as SearchNftReq);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const normilizedData = camelize(data.results) as any;
        yield put(setSearchValues({ key: searchType, values: normilizedData }));
        break;
      }

      default: {
        console.warn('invalid search type');
        break;
      }
    }
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH, searchSaga);
}

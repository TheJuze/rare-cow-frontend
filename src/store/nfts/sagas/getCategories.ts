import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import banner from 'assets/img/exploreBanner.png';
import { setCategories } from '../reducer';

import { getCategories } from '../actions';
import actionTypes from '../actionTypes';

export function* getCategoriesSaga({ type, payload }: ReturnType<typeof getCategories>) {
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.getCategories, payload);
    yield put(setCategories([{
      banner,
      name: 'All Categories',
      description:
        'Buy NFTs that are directly sold by top creators. Monetize your own creations in NFT.We have compiled a number of popular categories in the NFT space. You can learn more about each of them.',
      image: '',
    }, ...data]));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_CATEGORIES, getCategoriesSaga);
}

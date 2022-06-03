/* eslint-disable max-len */
import { put, takeLatest } from 'redux-saga/effects';
import { request } from 'store/api/actions';
import { updateTheme } from '../actions';
import actionTypes from '../actionTypes';
import { setIsLight } from '../reducer';

export function* updateThemeSaga({ type, payload: { isLight } }: ReturnType<typeof updateTheme>) {
  yield put(request(type));

  yield put(setIsLight({ isLight }));
}

export default function* listener() {
  yield takeLatest(actionTypes.UPDATE_THEME, updateThemeSaga);
}

import {
  put, takeLatest, call, select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import profileSelector from 'store/profile/selectors';
import { validStatuses } from 'appConstants';
import actionsTypes from '../actionsTypes';
import { follow } from '../actions';
import { updateProfile } from '../reducer';

export function* followSaga({
  type,
  payload: { id },
}: ReturnType<typeof follow>) {
  yield put(apiActions.request(type));

  try {
    const data = yield call(baseApi.follow, id);
    const followersCount: number = yield select(profileSelector.getProp('followersCount'));

    yield put(
      updateProfile({
        isFollowing: validStatuses.includes(data.status),
        followersCount: followersCount + 1,
      }),
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.FOLLOW, followSaga);
}

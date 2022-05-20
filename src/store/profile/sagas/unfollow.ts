import {
  put, takeLatest, call, select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import profileSelector from 'store/profile/selectors';
import { validStatuses } from 'appConstants';
import actionsTypes from '../actionsTypes';
import { unfollow } from '../actions';
import { updateProfile } from '../reducer';

export function* unfollowSaga({
  type,
  payload: { id },
}: ReturnType<typeof unfollow>) {
  yield put(apiActions.request(type));
  const followersCount: number = yield select(
    profileSelector.getProp('followersCount'),
  );

  try {
    const data = yield call(baseApi.unfollow, id);

    yield put(
      updateProfile({
        isFollowing: !validStatuses.includes(data.status),
        followersCount: followersCount - 1,
      }),
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.UNFOLLOW, unfollowSaga);
}

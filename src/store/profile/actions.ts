import { createAction } from '@reduxjs/toolkit';

import { EditProfile, GetProfileByIdRequest, RequestWithId } from 'types/requests';

import profileActionTypes from './actionsTypes';

export const getProfileById = createAction<GetProfileByIdRequest>(profileActionTypes.GET_PROFILE);
export const editProfileInfo = createAction<EditProfile>(profileActionTypes.EDIT_PROFILE_INFO);
export const follow = createAction<RequestWithId>(profileActionTypes.FOLLOW);
export const unfollow = createAction<RequestWithId>(profileActionTypes.UNFOLLOW);

const profileActionCreators = {
  getProfileById,
  editProfileInfo,
  follow,
  unfollow,
};
export default profileActionCreators;

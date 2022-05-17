import { createAction } from '@reduxjs/toolkit';

import { EditProfile, GetProfileByIdRequest } from 'types/requests';

import profileActionTypes from './actionsTypes';

export const getProfileById = createAction<GetProfileByIdRequest>(profileActionTypes.GET_PROFILE);
export const editProfileInfo = createAction<EditProfile>(profileActionTypes.EDIT_PROFILE_INFO);

const profileActionCreators = {
  getProfileById,
  editProfileInfo,
};
export default profileActionCreators;

import { createAction } from '@reduxjs/toolkit';

import { GetProfileByIdRequest } from 'types/requests';

import profileActionTypes from './actionsTypes';

export const getProfileById = createAction<GetProfileByIdRequest>(profileActionTypes.GET_PROFILE);

const profileActionCreators = {
  getProfileById,
};
export default profileActionCreators;

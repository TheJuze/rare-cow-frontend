import { createAction } from '@reduxjs/toolkit';

import {
  GetTokenBalanceReq,
  LoginReq,
  RequestWithNetwork,
  UpdateUserInfoReq,
  UpdateThemeReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const getTokenBalance = createAction<GetTokenBalanceReq>(actionTypes.GET_TOKEN_BALANCE);
export const updateUserInfo = createAction<UpdateUserInfoReq>(actionTypes.UPDATE_USER_INFO);
export const updateTheme = createAction<UpdateThemeReq>(actionTypes.UPDATE_THEME);
export const getSelfCollections = createAction<RequestWithNetwork>(
  actionTypes.GET_SELF_COLLECTIONS,
);
export const login = createAction<LoginReq>(actionTypes.LOGIN);

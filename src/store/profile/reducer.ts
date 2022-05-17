import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileState, TBalance } from 'types';

const initialState: ProfileState = {
  address: undefined,
  avatar: undefined,
  bio: undefined,
  cover: undefined,
  createdAt: undefined,
  customUrl: undefined,
  displayName: undefined,
  facebook: undefined,
  followers: undefined,
  followersCount: undefined,
  follows: undefined,
  followsCount: undefined,
  id: undefined,
  instagram: undefined,
  isVerificated: undefined,
  name: undefined,
  site: undefined,
  twitter: undefined,
  url: undefined,
  email: undefined,
  balance: {
    USDT: '0',
    MATIC: '0',
  },
  collections: [],
};

export const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateProfileBalance: (state, action: PayloadAction<Partial<TBalance>>) => ({
      ...state,
      balance: { ...state.balance, ...action.payload },
    }),
  },
});

export const { updateProfile, updateProfileBalance } = profileReducer.actions;
export default profileReducer.reducer;

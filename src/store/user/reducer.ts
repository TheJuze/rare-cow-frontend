import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Chains, UserState } from 'types';

const initialState: UserState = {
  id: null,
  avatar: '',
  address: '',
  balance: 0,
  key: '',
  provider: '',
  displayName: '',
  collections: [],
  chain: Chains.polygon,
  isWhitelisted: false,
  rate: '',
  chainType: 'testnet',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateWallet: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateProvider: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateChain: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    connectWalletState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateCollections: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateIsWhitelisted: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateRate: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    disconnectWalletState: () => {
      localStorage.removeItem('rare-cow-wallet-connect');
      return {
        ...initialState,
      };
    },
  },
});

export const {
  disconnectWalletState, updateUserState, updateProvider, updateCollections,
} =
  userReducer.actions;

export default userReducer.reducer;

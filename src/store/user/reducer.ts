import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Chains, TBalance, UserState } from 'types';

const initialState: UserState = {
  id: null,
  avatar: '',
  address: '',
  balance: {
    MATIC: '0',
    USDT: '0',
  },
  key: '',
  provider: '',
  displayName: '',
  collections: [],
  chain: Chains.polygon,
  isWhitelisted: false,
  rate: '',
  chainType: 'testnet',
  isUser: false,
  isDark: Boolean(localStorage.isDark),
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
    updateBalance: (state, action: PayloadAction<Partial<TBalance>>) => ({
      ...state,
      balance: { ...state.balance, ...action.payload },
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
    setIsUser: (state, action: PayloadAction<number>) => ({
      ...state,
      isUser: state.id === action.payload,
    }),
    setIsDark: (state, action: PayloadAction<Partial<UserState>>) => {
      localStorage.setItem('isDark', action.payload.isDark ? 'dark' : '');
      return {
        ...state,
        ...action.payload,
      };
    },
    disconnectWalletState: () => {
      localStorage.removeItem('rare-cow-wallet-connect');
      return {
        ...initialState,
      };
    },
  },
});

export const {
  disconnectWalletState,
  updateUserState,
  updateProvider,
  updateCollections,
  updateBalance,
  setIsUser,
  setIsDark,
} = userReducer.actions;

export default userReducer.reducer;

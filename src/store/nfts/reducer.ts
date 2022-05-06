import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NftsState, SearchActionPayloadType } from 'types';
import { TokenFull } from 'types/api/TokenFull';
import { TResponseCategories } from 'types/requests';

const initialState: NftsState = {
  nfts: [],
  presearchedNfts: [],
  detailedNft: null,
  categories: [],
  totalPages: 0,
  trending: [],
  searchData: {
    categories: [],
    collections: [],
    users: [],
  },
};

export const nftsReducer = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNfts: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      nfts: action.payload,
    }),
    setPresearchedNfts: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      presearchedNfts: action.payload,
    }),
    setSearchValues: (state, action: PayloadAction<SearchActionPayloadType>) => ({
      ...state,
      searchData: { ...state.searchData, [action.payload.key]: action.payload.values },
    }),
    setCategories: (state, action: PayloadAction<TResponseCategories>) => ({
      ...state,
      categories: action.payload,
    }),
    setTotalPages: (state, action: PayloadAction<number>) => ({
      ...state,
      totalPages: action.payload,
    }),
    setDetailedNft: (state, action: PayloadAction<TokenFull>) => ({
      ...state,
      detailedNft: action.payload,
    }),
    setTrending: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      trending: action.payload,
    }),
    clearDetailedNft: (state) => ({
      ...state,
      detailedNft: null,
    }),
    clearNfts: (state) => ({
      ...state,
      nfts: [],
    }),
    clearPresearchedNfts: (state) => ({
      ...state,
      presearchedNfts: [],
    }),
    clearTrending: (state) => ({
      ...state,
      trending: [],
    }),
  },
});

export const {
  setNfts,
  setPresearchedNfts,
  setDetailedNft,
  setTotalPages,
  setTrending,
  clearDetailedNft,
  clearNfts,
  clearTrending,
  clearPresearchedNfts,
  setCategories,
  setSearchValues,
} = nftsReducer.actions;

export default nftsReducer.reducer;

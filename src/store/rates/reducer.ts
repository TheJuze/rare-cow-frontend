import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rates } from 'types/api';
import { RatesState } from 'types/store/rates';

const initialState: RatesState = {
  rates: [],
};

const ratesReducer = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    updateRates: (state, action: PayloadAction<Rates[]>) => ({
      ...state,
      rates: action.payload,
    }),
  },
});

export const { updateRates } = ratesReducer.actions;
export default ratesReducer.reducer;

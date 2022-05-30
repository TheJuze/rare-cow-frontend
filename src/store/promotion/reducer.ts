import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedPromotionOption, PromoteInitialState } from 'types';
import { PromotionSettings } from 'types/api/PromotionSettings';

const initialState: PromoteInitialState = {
  promoteState: [],
  selectedOption: null,
};

const promoteReducer = createSlice({
  name: 'promote',
  initialState,
  reducers: {
    setPromoteState: (state, action: PayloadAction<PromotionSettings[]>) => ({
      ...state,
      promoteState: action.payload,
    }),
    setSelectedOption: (state, action: PayloadAction<ExtendedPromotionOption | null>) => ({
      ...state,
      selectedOption: action.payload,
    }),
  },
});

export const { setPromoteState, setSelectedOption } = promoteReducer.actions;

export default promoteReducer.reducer;

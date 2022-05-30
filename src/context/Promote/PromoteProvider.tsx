import React, { FC, useMemo, useReducer } from 'react';
import { PromotionSettings } from 'types/api/PromotionSettings';
import { PromoteActions, PromoteActionsType } from './PromoteActionCreators';
import { PromoteContext } from './PromoteContext';

export type InitialState = {
  promotionState: PromotionSettings[],
};

const initialState: InitialState = {
  promotionState: [],
};

const reducer = (state: InitialState, action: PromoteActionsType) => {
  switch (action.type) {
    case PromoteActions.SET_PROMOTION_SETTINGS: {
      return {
        ...state,
        promoteState: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const getInitialState = () => initialState;

export const PromoteProvider:FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return(
    <PromoteContext.Provider value={value}>
      {children}
    </PromoteContext.Provider>
  );
};

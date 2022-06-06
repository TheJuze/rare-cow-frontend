import collectionsActionTypes from 'store/collections/actionTypes';
import nftActionTypes from 'store/nfts/actionTypes';
import profileActionTypes from 'store/profile/actionsTypes';
import promoteActionTypes from 'store/promotion/actionTypes';
import ratesActionTypes from 'store/rates/actionTypes';
import userActionTypes from 'store/user/actionTypes';
import type { StateWithUIState } from 'types';

const mergedActions = {
  ...ratesActionTypes,
  ...promoteActionTypes,
  ...profileActionTypes,
  ...collectionsActionTypes,
  ...nftActionTypes,
  ...userActionTypes,
} as const;

type CommonActions = keyof typeof mergedActions;

const uiSelector = {
  getUI: (state: StateWithUIState) => state.ui,
  getProp: (propKey: string) => (state: StateWithUIState) => state.ui[propKey],
  getStatus: (keys: CommonActions[]) => (state: StateWithUIState) => Object
    .entries(state.ui).filter(([actionType]) => keys.includes(actionType as CommonActions))
    .map(([, actionStatus]) => actionStatus),
};

export default uiSelector;

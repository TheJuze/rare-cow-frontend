import collectionsActionTypes from 'store/collections/actionTypes';
import nftActionTypes from 'store/nfts/actionTypes';
import userActionTypes from 'store/user/actionTypes';
import { UIState } from 'types';
import { RequestStatus } from 'types/store';
import { getUIReducer } from '.';

const initialState: UIState = {
  [userActionTypes.GET_TOKEN_BALANCE]: RequestStatus.INIT,
  [collectionsActionTypes.CREATE_COLLECTION]: RequestStatus.INIT,
  [nftActionTypes.SEARCH]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;

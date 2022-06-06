import { createAction } from '@reduxjs/toolkit';
import { BuyPromotion } from 'types/requests';
import promoteActionTypes from './actionTypes';

export const getPromotions = createAction(promoteActionTypes.SET_PROMOTION_SETTINGS);
export const buyPromotion = createAction<BuyPromotion>(promoteActionTypes.BUY_PROMOTION);

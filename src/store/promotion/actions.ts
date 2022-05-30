import { createAction } from '@reduxjs/toolkit';
import promoteActionTypes from './actionTypes';

export const getPromotions = createAction(promoteActionTypes.SET_PROMOTION_SETTINGS);

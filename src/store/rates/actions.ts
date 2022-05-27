import { createAction } from '@reduxjs/toolkit';
import { RequestWithNetwork } from 'types/requests';
import ratesActionTypes from './actionTypes';

export const getRates = createAction<RequestWithNetwork>(ratesActionTypes.GET_RATES);

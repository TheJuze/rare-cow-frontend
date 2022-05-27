/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Currency } from "./Currency";
import { State } from "./enums";
import { UserSlim } from "./UserSlim";


export interface Bid {
    amount?: string;
    currency?: Currency;
    id?: number;
    quantity?: number;
    state?: State;
    user?: UserSlim;
}
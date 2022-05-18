/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Currency } from "./Currency";
import { Method } from "./enums";
import { UserSlim } from "./UserSlim";


export interface TokenHistory {
    amount?: number;
    currency: Currency;
    date?: string;
    id?: number;
    method?: Method;
    newOwner?: UserSlim;
    oldOwner: UserSlim;
    price?: string;
    usdPrice?: string;
}
/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Bid } from "./Bid";
import { CollectionSlim } from "./CollectionSlim";
import { UserSlim } from "./UserSlim";
import { Currency } from "./Currency";
import { TokenHistory } from "./TokenHistory";
import { Network } from "./Network";
import { Ownership } from "./Ownership";
import { Tag } from "./Tag";
import { Property } from "./Property";
import { Promotion } from "./Promotion";


export interface TokenFull {
    is_timed_auc_selling: boolean;
    animation?: string;
    available?: number;
    bids?: Bid[];
    collection: CollectionSlim;
    createdAt?: string;
    creator: UserSlim;
    currency: Currency;
    description?: string;
    digitalKey?: string;
    endAuction?: string;
    externalLink?: string;
    format?: string;
    hasDigitalKey: boolean;
    highestBid: Bid;
    history?: TokenHistory[];
    id?: number;
    internalId?: number;
    isAucSelling: boolean;
    isLiked?: boolean;
    isSelling?: boolean;
    isTimedAucSelling: boolean;
    likeCount?: number;
    media?: string;
    name: string;
    network: Network;
    owners: Ownership[];
    price?: string;
    promotionInfo?: Promotion;
    properties?: Property[];
    rankings: any;
    sellers?: Ownership[];
    standart?: string;
    startAuction?: string;
    stats: any;
    tags: Tag[];
    totalSupply: number;
    usdPrice: number;
    viewsCount?: string;
    featuredPromotionInfo?: any;
    premiumPromotionInfo?: any;
}
import { TAppliedCurrencies } from 'appConstants/currency';
import { Collection } from 'types/api/Collection';
import { Chains, IChainType } from 'types/connect';

export type TBalance = {
  [key in TAppliedCurrencies]: string;
};

export type UserState = {
  id: number | null;
  avatar: string;
  address: string;
  balance: TBalance;
  key: string;
  provider: string;
  chain: Chains;
  displayName: string;
  collections: Collection[];
  isWhitelisted: boolean;
  rate: string;
  chainType: IChainType;
  isUser: boolean;
  isDark: boolean;
};

export type LoginReq = {
  address: string;
  msg: string;
  signed_msg: string;
};

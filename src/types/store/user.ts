import { IChainType } from 'types/connect';

export type UserState = {
  address: string;
  balance: string | number;
  provider: string;
  chainType: IChainType;
};

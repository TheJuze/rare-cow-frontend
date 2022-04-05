import { IChainType } from 'types/connect';
import Web3 from 'web3';

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type LoginReq = {
  address: string;
  web3Provider: Web3;
};

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

export type GetTokenBalanceReq = {
  web3Provider: Web3;
  chainType: IChainType;
};

export type UpdateUserInfoReq = {
  web3Provider: Web3;
};

export type ApproveReq = {
  amount: string;
  spender: string;
  tokenAddress: string;
  web3Provider: Web3;
};

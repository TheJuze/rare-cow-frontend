import { chains } from 'config';
import { ChainsEnum, IChainType } from 'types';
import Web3 from 'web3';

export const getWeb3 = async (chainName: ChainsEnum, chainType: IChainType) => {
  const rpcUrl = chains[ChainsEnum[chainName]][chainType].provider.WalletConnect.provider.rpc;
  const web3 = new Web3(rpcUrl);
  return web3;
};

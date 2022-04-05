// import { isMainnet } from 'config/constants';
import { ChainsEnum, IChainType } from 'types';
import { AbiItem } from 'web3-utils';

import { getWeb3 } from '.';

export const createContract = async (address: string, abi: AbiItem[], chainName: ChainsEnum, chainType: IChainType) => {
  const web3 = await getWeb3(chainName, chainType);
  const contract = new web3.eth.Contract(abi, address);
  return contract;
};

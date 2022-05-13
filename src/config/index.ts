/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chains, ChainsEnum, IConnectWallet, IContracts,
} from 'types';
import Web3 from 'web3';

import {
  erc20Abi, erc721Abi,
  erc1155Abi, marketPlaceAbi, whitelistAbi, erc721InstanceAbi, erc1155InstanceAbi,
} from './abi';
import { isMainnet } from './constants';

export const MATIC_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const chains: {
  [key: string]: {
    name: string;
    chainId: number;
    provider: {
      [key: string]: any;
    };
    img?: any;
    scanner?: string;
  };
} = {
  [ChainsEnum['Binance-Smart-Chain']]: {
    name: ChainsEnum['Binance-Smart-Chain'],
    chainId: isMainnet ? 56 : 97,
    provider: {
      MetaMask: { name: 'MetaMask' },
      /* WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [isMainnet ? 56 : 97]: isMainnet
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            },
            chainId: isMainnet ? 56 : 97,
          },
        },
      }, */
    },
    scanner: isMainnet ? 'https://bscscan.com/' : 'https://testnet.bscscan.com/',
  },
  [ChainsEnum.Polygon]: {
    name: ChainsEnum.Polygon,
    chainId: isMainnet ? 137 : 80001,
    provider: {
      MetaMask: { name: 'MetaMask' },
      chainName: ChainsEnum.Polygon,
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpc: isMainnet
        ? 'https://rpc-mainnet.maticvigil.com/'
        : 'https://matic-mumbai.chainstacklabs.com',
      blockExplorerUrl: isMainnet
        ? 'https://explorer.matic.network/'
        : 'https://mumbai.polygonscan.com/',
    },
    scanner: isMainnet ? 'https://explorer.matic.network/' : 'https://mumbai.polygonscan.com/',
  },
};

export const connectWallet = (newChainName: Chains): IConnectWallet => {
  const chain = chains[newChainName];
  return {
    network: {
      chainName: chain.name,
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

// eslint-disable-next-line no-shadow
export enum ContractsNames {
  USDT = 'USDT',
  marketplace = 'marketplace',
  erc721 = 'erc721',
  erc1155 = 'erc1155',
  erc721Instance = 'erc721Instance',
  erc1155Instance = 'erc1155Instance',
  whitelist = 'whitelist',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.whitelist]: {
      testnet: {
        address: {
          [Chains.bsc]: '0x3F79F1DEDc1596179d8fCfd62270eCCC344C6517',
          [Chains.polygon]: '0x3F79F1DEDc1596179d8fCfd62270eCCC344C6517', // replace to polygon address
        },
        abi: whitelistAbi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
          [Chains.polygon]: '',
        },
        abi: whitelistAbi,
      },
    },
    [ContractsNames.USDT]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xcec38C5b1B4b869835623CFCB7F42a206589A446',
          [Chains.polygon]: '0xcec38C5b1B4b869835623CFCB7F42a206589A446', // replace to polygon address
        },
        abi: erc20Abi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc20Abi,
      },
    },
    [ContractsNames.marketplace]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xFfa329d313d371ECC595539847a300eF231bEafB',
          [Chains.polygon]: '0x7d65562e92C803079EaB260AB3Ef6FBcC4d1e04c',
        },
        abi: marketPlaceAbi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: marketPlaceAbi,
      },
    },
    [ContractsNames.erc721]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
          [Chains.polygon]: '0xC3ff779C932B6f75716c159318C02cF52cCB4056',
        },
        abi: erc721Abi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc721Abi,
      },
    },
    [ContractsNames.erc721Instance]: {
      testnet: {
        address: {
          [Chains.bsc]: '',
          [Chains.polygon]: '',
        },
        abi: erc721InstanceAbi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc721InstanceAbi,
      },
    },
    [ContractsNames.erc1155]: {
      testnet: {
        address: {
          [Chains.bsc]: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
          [Chains.polygon]: '0x87e2F2bD5f60A8bb4eAEB24caAA280eA1d1559c0',
        },
        abi: erc1155Abi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc1155Abi,
      },
    },
    [ContractsNames.erc1155Instance]: {
      testnet: {
        address: {
          [Chains.bsc]: '',
          [Chains.polygon]: '',
        },
        abi: erc1155InstanceAbi,
      },
      mainnet: {
        address: {
          [Chains.bsc]: '',
        },
        abi: erc1155InstanceAbi,
      },
    },
  },
};

type TGetContractAddress = {
  contractName: ContractsNames;
  reqInfo?: 'all' | 'address' | 'abi';
  mainnet?: boolean;
  chain?: Chains;
};

export const currencyToContractMap = {
  USDT: ContractsNames.USDT,
};

export const getContractInfo = ({
  contractName,
  reqInfo = 'all',
  mainnet = isMainnet,
  chain = Chains.polygon,
}: TGetContractAddress) => {
  const {
    abi,
    address: { [chain]: address },
  } = contractsConfig.contracts[contractName][mainnet ? 'mainnet' : 'testnet'];
  return {
    all: { abi, address },
    address: { address },
    abi: { abi },
  }[reqInfo];
};

type TContractGetterProperties = {
  web3Provider: Web3;
  contractName: ContractsNames;
  mainnet?: boolean;
  chain?: Chains;
  specificAddress?: string;
};

export const generateContract = ({
  web3Provider,
  contractName,
  mainnet = isMainnet,
  chain = Chains.polygon,
  specificAddress,
}: TContractGetterProperties) => {
  if (web3Provider) {
    const { abi, address } = getContractInfo({ contractName, mainnet, chain });
    return new web3Provider.eth.Contract(abi, specificAddress || address);
  }
  console.log('%c web3 provider is not passed, return null', 'background: #b00020; color: #ffffff');
  return null;
};

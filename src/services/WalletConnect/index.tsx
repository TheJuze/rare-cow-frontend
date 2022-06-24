/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { connectWallet as connectWalletConfig } from 'config';

import { useDispatch } from 'react-redux';
import { disconnectWalletState, updateProvider } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { useShallowSelector } from 'hooks';
import { Chains, State, UserState, WalletProviders } from 'types';
import { WalletService } from 'services/WalletService';
import { login, updateUserInfo } from 'store/user/actions';

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}

const Web3Context = createContext({} as IContextValue);

const WalletConnectContext: FC = ({ children }) => {
  const [currentSubscriber, setCurrentSubscriber] = useState<any>();
  const WalletConnect = useRef(new WalletService());
  const dispatch = useDispatch();
  const {
    address,
    key,
    provider: WalletProvider,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const subscriberSuccess = useCallback(
    (data: any) => {
      if (data.name === 'accountsChanged') {
        dispatch(login({ address: data.address, web3Provider: WalletConnect.current.Web3() }));
        toast.info('Please sign login message at MetaMask');
      }
    },
    [dispatch],
  );

  const subscriberError = useCallback(
    (err: any) => {
      console.error(err);
      if (err.code === 4) {
        WalletConnect.current.resetConnect();
        toast.error('You changed to wrong network. Please choose Polygon');
        dispatch(disconnectWalletState());
      }
    },
    [WalletConnect, dispatch],
  );
  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains) => {
      const connected = await WalletConnect.current.initWalletConnect(provider, chain);
      if (connected) {
        try {
          if (!currentSubscriber) {
            const sub = WalletConnect.current
              .eventSubscribe()
              .subscribe(subscriberSuccess, subscriberError);

            setCurrentSubscriber(sub);
          }
          const accountInfo: any = await WalletConnect.current.getAccount();

          if (key?.length && address === accountInfo?.address) {
            dispatch(updateUserInfo({ web3Provider: WalletConnect.current.Web3() }));
            return;
          }

          if (accountInfo.address) {
            dispatch(
              login({ address: accountInfo.address, web3Provider: WalletConnect.current.Web3() }),
            );
            dispatch(updateProvider({ provider: accountInfo.type }));
          }
        } catch (error: any) {
          if (!window.ethereum) {
            // metamask doesn't installed,
            // redirect to download MM or open MM on mobile
            if (error.code === 4) {
              switch (error.type) {
                case 'MetaMask':
                  if (!window.ethereum) {
                    window.open(
                      `https://metamask.app.link/dapp/${
                        window.location.hostname + window.location.pathname
                      }/?utm_source=mm`,
                    );
                  }
                  break;
                case 'WalletConnect':
                  if (error.message.subtitle === 'Chain error') {
                    toast.error(error.message.text);
                  }
                  break;

                default:
                  break;
              }
            }
          } else {
            const { network } = connectWalletConfig(Chains.polygon);
            window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${network.chainID.toString(16)}`,
                  chainName: network.chainName,
                  nativeCurrency: network.nativeCurrency,
                  rpcUrls: [network.rpc],
                  blockExplorerUrls: [network.blockExplorerUrl],
                },
              ],
            });
          }
        }
      }
    },
    [address, currentSubscriber, dispatch, key?.length, subscriberError, subscriberSuccess],
  );

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.current.resetConnect();
    currentSubscriber?.unsubscribe();
  }, [currentSubscriber, dispatch]);

  useEffect(() => {
    if (WalletProvider && connect) {
      connect(WalletProviders.metamask, Chains.polygon);
    }
  }, []);
  const values = useMemo(
    () => ({ connect, disconnect, walletService: WalletConnect.current }),
    [connect, disconnect],
  );

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
};

export const useWalletConnectorContext = () => useContext(Web3Context);

export default WalletConnectContext;

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { disconnectWalletState, updateProvider } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { Subscription } from 'rxjs';

import { useShallowSelector } from 'hooks';
import {
  Chains, State, UserState, WalletProviders,
} from 'types';
import { WalletService } from 'services/WalletService';
import { login, updateUserInfo } from 'store/user/actions';

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}

const Web3Context = createContext({} as IContextValue);

const WalletConnectContext: FC = ({ children }) => {
  const [currentSubscriber, setCurrentSubscriber] = useState<Subscription>();
  const WalletConnect = useRef(new WalletService());
  const dispatch = useDispatch();
  const {
    address,
    key,
    provider: WalletProvider,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.current.resetConnect();
    currentSubscriber?.unsubscribe();
  }, [currentSubscriber, dispatch]);

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
          const sub = WalletConnect.current
            .eventSubscribe()
            .subscribe(subscriberSuccess, subscriberError);
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

          setCurrentSubscriber(sub);
        } catch (error: any) {
          console.log(error);
          // metamask doesn't installed,
          // redirect to download MM or open MM on mobile
          if (error.code === 4) {
            window.open(
              `https://metamask.app.link/dapp/${
                window.location.hostname + window.location.pathname
              }/?utm_source=mm`,
            );
          }
        }
      }
    },
    [address, dispatch, key?.length, subscriberError, subscriberSuccess],
  );

  useEffect(() => {
    if (WalletProvider) {
      connect(WalletProviders.metamask, Chains.polygon);
    }
  }, [WalletProvider, address, connect]);

  return (
    <Web3Context.Provider value={{ connect, disconnect, walletService: WalletConnect.current }}>
      {children}
    </Web3Context.Provider>
  );
};

const useWalletConnectorContext = () => useContext(Web3Context);

export { WalletConnectContext, useWalletConnectorContext };

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
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
import { login } from 'store/user/actions';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address, provider: WalletProvider } = useShallowSelector<State, UserState>(
    userSelector.getUser,
  );

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.current.resetConnect();
    currentSubscriber?.unsubscribe();
  }, [currentSubscriber, dispatch]);

  const subscriberSuccess = useCallback(() => {
    if (document.visibilityState !== 'visible') {
      disconnect();
    }
  }, [disconnect]);

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
    [WalletConnect, dispatch, subscriberError, subscriberSuccess],
  );

  return (
    <Web3Context.Provider value={{ connect, disconnect, walletService: WalletConnect.current }}>
      {children}
    </Web3Context.Provider>
  );
};

const useWalletConnectorContext = () => useContext(Web3Context);

export { WalletConnectContext, useWalletConnectorContext };

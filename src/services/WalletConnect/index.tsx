/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { disconnectWalletState, updateUserState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { Subscription } from 'rxjs';

import { useShallowSelector } from 'hooks';
import { Chains, State, UserState, WalletProviders } from 'types';
import { WalletService } from 'services/WalletService';

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}

const Web3Context = createContext({} as IContextValue);

const WalletConnectContext: FC = ({ children }) => {
  const [currentSubsriber, setCurrentSubsciber] = useState<Subscription>();
  const WalletConnect = useMemo(() => new WalletService(), []);
  const dispatch = useDispatch();
  const { address, provider: WalletProvider, chainType } = useShallowSelector<State, UserState>(userSelector.getUser);

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.resetConnect();
    currentSubsriber?.unsubscribe();
  }, [WalletConnect, currentSubsriber, dispatch]);

  const subscriberSuccess = useCallback(() => {
    if (document.visibilityState !== 'visible') {
      disconnect();
    }
  }, [disconnect]);

  const subscriberError = useCallback(
    (err: any) => {
      console.error(err);
      if (err.code === 4) {
        WalletConnect.resetConnect();
        toast.error('You changed to wrong network. Please choose Binance-Smart-Chain');
        dispatch(disconnectWalletState());
      }
    },
    [WalletConnect, dispatch],
  );

  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains) => {
      const connected = await WalletConnect.initWalletConnect(provider, chain, chainType);
      if (connected) {
        try {
          const sub = WalletConnect.eventSubscribe().subscribe(subscriberSuccess, subscriberError);
          const accountInfo: any = await WalletConnect.getAccount();

          if (accountInfo.address) {
            dispatch(updateUserState({ provider: accountInfo.type, address: accountInfo.address }));
            toast.success(`Wallet connected: ${accountInfo.address.slice(0, 5)}...${accountInfo.address.slice(-5)}`);
          }

          setCurrentSubsciber(sub);
        } catch (error: any) {
          console.log(error);
          // metamask doesn't installed,
          // redirect to download MM or open MM on mobile
          if (error.code === 4) {
            window.open(`https://metamask.app.link/dapp/${window.location.hostname + window.location.pathname}/?utm_source=mm`);
          }
        }
      }
    },
    [WalletConnect, chainType, dispatch, subscriberError, subscriberSuccess],
  );

  useEffect(() => {
    // connect user if he connected previously
    if (WalletProvider && !address.length) {
      connect(WalletProviders.metamask, Chains.bsc);
    }
  }, [WalletProvider, address.length, connect]);

  return <Web3Context.Provider value={{ connect, disconnect, walletService: WalletConnect }}>{children}</Web3Context.Provider>;
};

const useWalletConnectorContext = () => useContext(Web3Context);

export { WalletConnectContext, useWalletConnectorContext };

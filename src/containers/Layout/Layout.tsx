/* eslint-disable max-len */
// import { UrlObject } from 'url';

import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';

import { Footer, Header } from 'containers';
import { useWalletConnectorContext } from 'services';
import { useShallowSelector, useThemeDetector } from 'hooks';
import {
  RequestStatus, State, UserState, WalletProviders,
} from 'types';
import userSelector from 'store/user/selectors';
import uiSelector from 'store/ui/selectors';
import { useLocation } from 'react-router-dom';
import actionTypesUser from 'store/user/actionTypes';
import { useSmoothTopScroll } from 'hooks/useSmoothTopScroll';
import { useDispatch } from 'react-redux';
import { updateUserState } from 'store/user/reducer';
import clsx from 'clsx';
import { getFeeInfo } from 'store/nfts/actions';
import { updateTheme } from 'store/user/actions';
import styles from './styles.module.scss';

export interface LayoutProps {
  // route?: UrlObject | string;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const isDark = useShallowSelector(userSelector.getProp('isDark'));
  const { pathname } = useLocation();
  const { connect, disconnect, walletService } = useWalletConnectorContext();
  const isDarkBrowser = useThemeDetector();

  const dispatch = useDispatch();

  const handleSwitchTheme = useCallback((newValue: boolean) => {
    dispatch(updateTheme({ isDark: newValue }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateTheme({ isDark: isDarkBrowser }));
  }, [dispatch, isDarkBrowser]);

  useEffect(() => {
    dispatch(updateTheme({ isDark }));
  }, [dispatch, isDark]);

  const { address, chainType } = useShallowSelector<State, UserState>(userSelector.getUser);
  const { [actionTypesUser.UPDATE_USER_INFO]: userInfoRequest } = useShallowSelector(
    uiSelector.getUI,
  );

  const isUserInfoLoading = useMemo(
    () => userInfoRequest === RequestStatus.REQUEST,
    [userInfoRequest],
  );

  const handleConnectWallet = useCallback(
    async (provider = WalletProviders.walletConnect, newChain) => {
      connect(provider, newChain);
    },
    [connect],
  );

  const disconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleToggleChainType = useCallback(() => {
    dispatch(updateUserState({ chainType: chainType === 'mainnet' ? 'testnet' : 'mainnet' }));
  }, [chainType, dispatch]);

  const initialRequests = useCallback(() => {
    dispatch(getFeeInfo({ web3Provider: walletService.Web3() }));
  }, [dispatch, walletService]);

  useEffect(() => {
    initialRequests();
  }, [initialRequests]);

  const firstPathAtPathname = useMemo(() => pathname.split('/')[1], [pathname]);

  useSmoothTopScroll(firstPathAtPathname);

  const isHomePage = useMemo(() => pathname === '/', [pathname]);

  const isNeedToShowHeaderFooter = useMemo(() => true, []);
  return (
    <div className={clsx(styles.app, { [styles.dark]: isDark })}>
      <div className={styles.content}>
        {isNeedToShowHeaderFooter && (
          <Header
            address={address}
            chainType={chainType}
            isHomePage={isHomePage}
            isUserInfoLoading={isUserInfoLoading}
            onConnectWallet={handleConnectWallet}
            disconnect={disconnectWallet}
            onToggleChainType={handleToggleChainType}
            isDark={isDark}
            setIsDark={handleSwitchTheme}
          />
        )}
        <main className={styles.main}>{children}</main>
        {isNeedToShowHeaderFooter && <Footer className={styles.footer} />}
      </div>
    </div>
  );
};

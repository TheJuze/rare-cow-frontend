/* eslint-disable max-len */
// import { UrlObject } from 'url';

import React, { FC, useCallback, useMemo } from 'react';

import { Footer, Header } from 'containers';
import { useWalletConnectorContext } from 'services';
import { useShallowSelector } from 'hooks';
import {
  RequestStatus, State, UserState, WalletProviders,
} from 'types';
import userSelector from 'store/user/selectors';
import { NotificationModal } from 'containers/NotificationModal';
import uiSelector from 'store/ui/selectors';
import { NavLink, useLocation } from 'react-router-dom';
import actionTypesUser from 'store/user/actionTypes';
import { useSmoothTopScroll } from 'hooks/useSmoothTopScroll';
import { useDispatch } from 'react-redux';
import { updateUserState } from 'store/user/reducer';
import clsx from 'clsx';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { createDynamicLink, routes } from 'appConstants';
import styles from './styles.module.scss';

export interface LayoutProps {
  // route?: UrlObject | string;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { connect, disconnect } = useWalletConnectorContext();

  const dispatch = useDispatch();
  const { breadcrumbs } = useBreadcrumbs();

  const { address, chainType } = useShallowSelector<State, UserState>(userSelector.getUser);
  const { [actionTypesUser.UPDATE_USER_INFO]: userInfoRequest } = useShallowSelector(
    uiSelector.getUI,
  );

  const isUserInfoLoading = useMemo(
    () => userInfoRequest === RequestStatus.REQUEST,
    [userInfoRequest],
  );

  const handleConnectWallet = useCallback(
    async (provider = WalletProviders.metamask, newChain) => {
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

  const firstPathAtPathname = useMemo(() => pathname.split('/')[1], [pathname]);

  useSmoothTopScroll(firstPathAtPathname);

  const isHomePage = useMemo(() => pathname === '/', [pathname]);

  const isNeedToShowHeaderFooter = useMemo(() => isHomePage, [isHomePage]);
  return (
    <div className={clsx(styles.app)}>
      <div className={styles.content}>
        <NavLink to={createDynamicLink(routes.nest.profile.nest.aboutMe.path, { id: 1 })}>Profile</NavLink>
        <NavLink to={createDynamicLink(routes.nest.profile.nest.edit.path, { id: 1 })}>Edit</NavLink>
        <NavLink to="/create/single">Single</NavLink>
        <NotificationModal />
        <Breadcrumbs paths={breadcrumbs} />
        {isNeedToShowHeaderFooter && (
          <Header
            address={address}
            chainType={chainType}
            isHomePage={isHomePage}
            isUserInfoLoading={isUserInfoLoading}
            onConnectWallet={handleConnectWallet}
            disconnect={disconnectWallet}
            onToggleChainType={handleToggleChainType}
          />
        )}
        {children}
        {isNeedToShowHeaderFooter && <Footer />}
      </div>
    </div>
  );
};

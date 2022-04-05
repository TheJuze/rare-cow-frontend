import { UrlObject } from 'url';

import { FC, useCallback, useMemo } from 'react';

import { Footer, Header } from 'containers';
import { MobileNavigation } from 'containers/MobileNavigation';
import { useWalletConnectorContext } from 'services';
import { useShallowSelector, useWindowState } from 'hooks';
import { RequestStatus, State, UserState, WalletProviders } from 'types';
import userSelector from 'store/user/selectors';
import { NotificationModal } from 'containers/NotificationModal';
import uiSelector from 'store/ui/selectors';
import { useLocation } from 'react-router-dom';
import actionTypesUser from 'store/user/actionTypes';
import { useSmoothTopScroll } from 'hooks/useSmoothTopScroll';
import { useDispatch } from 'react-redux';
import { updateUserState } from 'store/user/reducer';
import s from './styles.module.scss';

export interface LayoutProps {
  route?: UrlObject | string;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { width } = useWindowState();
  const { pathname } = useLocation();
  const { connect, disconnect } = useWalletConnectorContext();

  const dispatch = useDispatch();

  const { address, chainType } = useShallowSelector<State, UserState>(userSelector.getUser);
  const { [actionTypesUser.UPDATE_USER_INFO]: userInfoRequest } = useShallowSelector(uiSelector.getUI);

  const isUserInfoLoading = useMemo(() => userInfoRequest === RequestStatus.REQUEST, [userInfoRequest]);

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

  const isNeedToShowHeaderFooter = useMemo(
    // eslint-disable-next-line max-len
    () => isHomePage, // || other conditions
    [isHomePage],
  );

  return (
    <div className={s.root}>
      <div className={s.content}>
        <NotificationModal />
        {+width < 800 && <MobileNavigation />}
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

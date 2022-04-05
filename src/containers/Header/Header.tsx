import { Button } from 'components';
import { useCallback, VFC } from 'react';
import { Chains, WalletProviders } from 'types';

import s from './styles.module.scss';

export interface HeaderProps {
  address: string;
  disconnect: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnectWallet: (provider: any, newChain: any) => void;
  onToggleChainType: () => void;
  isHomePage: boolean;
  isUserInfoLoading: boolean;
  chainType: 'testnet' | 'mainnet';
}

export const Header: VFC<HeaderProps> = ({ address, disconnect, onConnectWallet, onToggleChainType, isHomePage, isUserInfoLoading, chainType }) => {
  console.debug(isHomePage, isUserInfoLoading);

  const handleChangeConnecting = useCallback(() => {
    if (!address.length) {
      onConnectWallet(WalletProviders.metamask, Chains.bsc);
    } else {
      disconnect();
    }
  }, [address.length, disconnect, onConnectWallet]);

  return (
    <header className={s.header}>
      <Button onClick={handleChangeConnecting}>{address.length ? address : 'Connect Wallet'}</Button>
      <Button onClick={() => onToggleChainType()}>{chainType}</Button>
    </header>
  );
};

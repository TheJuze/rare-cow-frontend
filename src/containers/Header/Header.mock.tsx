import { HeaderProps } from './Header';

export const headerPropsMocked: HeaderProps = {
  address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
  disconnect: () => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnectWallet: () => {},
  isHomePage: true,
  isUserInfoLoading: false,
  onToggleChainType: () => {},
  chainType: 'testnet',
  isDark: false,
  setIsDark: () => {},
};

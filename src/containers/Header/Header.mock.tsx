import { HeaderProps } from './Header';

export const headerPropsMocked: HeaderProps = {
  address: '',
  disconnect: () => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnectWallet: () => {},
  isHomePage: true,
  isUserInfoLoading: false,
  onToggleChainType: () => {},
  chainType: 'testnet',
};

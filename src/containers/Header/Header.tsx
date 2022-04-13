/* eslint-disable object-curly-newline */
import React, { useCallback, useState, VFC } from 'react';
// import { Chains, WalletProviders } from 'types';
import logo from 'assets/icons/logo.svg';
import arrow from 'assets/chevron-down.svg';
import { profileAvatar } from 'assets/img';
import cn from 'classnames';

import { SearchInput, Dropdown, Avatar, UserPopover } from 'components';
import { TDropdownValue } from 'types';
import { sliceString } from 'utils';
import { userPopoverPropsMocked } from 'components/UserPopover/UserPopover.mock';
import s from './styles.module.scss';
import { headerPropsMocked } from './Header.mock';

const dropdownOptions: TDropdownValue[] = [
  {
    id: 'all_categories',
    content: 'All categories',
    route: '/',
  },
  {
    id: 'anime',
    content: 'Anime illustration',
    route: '/',
  },
  {
    id: 'photo',
    content: 'Photo',
    route: '/',
  },
  {
    id: 'art',
    content: 'Art',
    route: '/',
  },
  {
    id: 'music',
    content: 'Music',
    route: '/',
  },
  {
    id: 'picture',
    content: 'Picture',
    route: '/',
  },
  {
    id: 'movie',
    content: 'Movie',
    route: '/',
  },
];
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

export const Header: VFC<HeaderProps> = ({
  address,
  disconnect,
  onConnectWallet,
  onToggleChainType,
  isHomePage,
  isUserInfoLoading,
  chainType,
}) => {
  console.debug(
    isHomePage,
    isUserInfoLoading,
    address,
    disconnect,
    onConnectWallet,
    onToggleChainType,
    chainType,
  );

  const [isUserShown, setIsUserShown] = useState(true);
  // const handleChangeConnecting = useCallback(() => {
  //   if (!address.length) {
  //     onConnectWallet(WalletProviders.metamask, Chains.bsc);
  //   } else {
  //     disconnect();
  //   }
  // }, [address.length, disconnect, onConnectWallet]);

  const handleChangeUserShown = useCallback(() => {
    setIsUserShown(!isUserShown);
  }, [isUserShown]);

  return (
    <header className={s.header}>
      <div className={s.headerLeft}>
        <img src={logo} alt="logo" className={s.logo} />
        <SearchInput
          searchValue=""
          isSearchResultsLoading={false}
          presearchedNfts={[]}
          onSearchValueChange={() => {}}
          classNameInput={s.headerInput}
        />
      </div>
      <div className={s.headerRight}>
        <Dropdown
          name="Explore"
          value={{ id: '0', content: 'Explore' }}
          setValue={() => {}}
          options={dropdownOptions}
          variant="outlined"
          classNameHead={s.headerDropdown}
          dropPosition="absolute"
        />
        <div className={s.address}>{sliceString(headerPropsMocked.address)}</div>
        <div className={s.user}>
          <button type="button" tabIndex={0} onClick={handleChangeUserShown} className={s.arrowBtn}>
            <img
              src={arrow}
              alt="arrow"
              className={cn(s.arrow, { [s.arrowUp]: isUserShown })}
            />
          </button>
          <Avatar avatar={profileAvatar} id={0} size="40" />
          <UserPopover {...userPopoverPropsMocked} visible={isUserShown} />
        </div>
      </div>
    </header>
  );
};

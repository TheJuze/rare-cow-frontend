/* eslint-disable object-curly-newline */
import React, { useCallback, useRef, useState, VFC } from 'react';
// import { Chains, WalletProviders } from 'types';
import logo from 'assets/icons/logo.svg';
import arrow from 'assets/chevron-down.svg';
import { profileAvatar } from 'assets/img';
import cn from 'classnames';

import { SearchInput, Dropdown, Avatar, UserPopover } from 'components';
import { useClickOutside } from 'hooks';
import { TDropdownValue } from 'types';
import { sliceString } from 'utils';
import { userPopoverPropsMocked } from 'components/UserPopover/UserPopover.mock';
import { Link } from 'react-router-dom';
import s from './styles.module.scss';
import { headerPropsMocked } from './Header.mock';

const dropdownOptions: TDropdownValue[] = [
  {
    id: 'all_categories',
    content: <Link to="/">All categories</Link>,
  },
  {
    id: 'anime',
    content: <Link to="/">Anime illustration</Link>,
  },
  {
    id: 'photo',
    content: <Link to="/">Photo</Link>,
  },
  {
    id: 'art',
    content: <Link to="/">Art</Link>,
  },
  {
    id: 'music',
    content: <Link to="/">Music</Link>,
  },
  {
    id: 'picture',
    content: <Link to="/">Picture</Link>,
  },
  {
    id: 'movie',
    content: <Link to="/">Movie</Link>,
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
  const [isUserShown, setIsUserShown] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const headRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  // const handleChangeConnecting = useCallback(() => {
  //   if (!address.length) {
  //     onConnectWallet(WalletProviders.metamask, Chains.bsc);
  //   } else {
  //     disconnect();
  //   }
  // }, [address.length, disconnect, onConnectWallet]);

  const handleShowUser = useCallback(() => {
    setIsUserShown(true);
  }, []);

  const handleHideUser = useCallback(() => {
    setIsUserShown(false);
  }, []);

  const handleSearchActive = useCallback((value: boolean) => {
    setIsSearchActive(value);
  }, []);

  useClickOutside(bodyRef, handleHideUser, headRef);

  return (
    <header className={s.header}>
      <div className={s.headerLeft}>
        <Link to="/" className={cn(s.logo, { [s.closed]: isSearchActive })}>
          <img src={logo} alt="logo" />
        </Link>
        <SearchInput
          searchValue=""
          isSearchResultsLoading={false}
          presearchedNfts={[]}
          onSearchValueChange={() => {}}
          classNameInput={s.headerInput}
          sendIsSearchActive={handleSearchActive}
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
          <button
            type="button"
            tabIndex={0}
            onClick={isUserShown ? () => handleHideUser() : () => handleShowUser()}
            className={s.arrowBtn}
            ref={headRef}
          >
            <img src={arrow} alt="arrow" className={cn(s.arrow, { [s.arrowUp]: isUserShown })} />
          </button>
          <Avatar avatar={profileAvatar} id={0} size="40" />
          <UserPopover {...userPopoverPropsMocked} visible={isUserShown} bodyRef={bodyRef} />
        </div>
      </div>
    </header>
  );
};

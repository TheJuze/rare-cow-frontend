/* eslint-disable object-curly-newline */
import React, { useCallback, useRef, useState, VFC } from 'react';
import logo from 'assets/icons/logo.svg';
import arrow from 'assets/chevron-down.svg';
import cn from 'classnames';

import { SearchInput, Dropdown, Avatar, UserPopover, Button } from 'components';
import { useClickOutside, useShallowSelector } from 'hooks';
import { Chains, TDropdownValue, WalletProviders } from 'types';
import { sliceString } from 'utils';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import userSelector from 'store/user/selectors';
import s from './styles.module.scss';

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

export const Header: VFC<HeaderProps> = ({ address, disconnect, onConnectWallet }) => {
  const [isUserShown, setIsUserShown] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const user = useShallowSelector(userSelector.getUser);
  const headRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const { breadcrumbs } = useBreadcrumbs();

  const handleChangeConnecting = useCallback(() => {
    if (!address.length) {
      onConnectWallet(WalletProviders.metamask, Chains.polygon);
    } else {
      disconnect();
    }
  }, [address.length, disconnect, onConnectWallet]);

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
      <div className={s.headerContainer}>
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
            placeholder="NFT Name, ID"
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
          <div className={s.address}>{sliceString(address)}</div>
          {address.length ? (
            <div className={s.user}>
              <button
                type="button"
                tabIndex={0}
                onClick={isUserShown ? () => handleHideUser() : () => handleShowUser()}
                className={s.arrowBtn}
                ref={headRef}
              >
                <img
                  src={arrow}
                  alt="arrow"
                  className={cn(s.arrow, { [s.arrowUp]: isUserShown })}
                />
              </button>
              <Avatar avatar={user.avatar} id={user.id} size="40" />
              <UserPopover {...user} visible={isUserShown} bodyRef={bodyRef} />
            </div>
          ) : (
            <Button onClick={handleChangeConnecting}>connect wallet</Button>
          )}
        </div>
      </div>
      <Breadcrumbs paths={breadcrumbs} />
    </header>
  );
};

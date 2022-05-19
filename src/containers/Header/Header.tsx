/* eslint-disable object-curly-newline */
import React, { useCallback, useRef, useState, VFC } from 'react';
import logo from 'assets/icons/logo.svg';
import arrow from 'assets/chevron-down.svg';
import cn from 'classnames';

import { SearchInput, Dropdown, Avatar, UserPopover, Button } from 'components';
import { useBreakpoints, useClickOutside, useShallowSelector } from 'hooks';
import { Modals, TDropdownValue } from 'types';
import { sliceString } from 'utils';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import userSelector from 'store/user/selectors';
import wallet from 'assets/wallet.svg';
import connect from 'assets/connect.svg';
import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
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

export const Header: VFC<HeaderProps> = ({ address, disconnect }) => {
  const [isUserShown, setIsUserShown] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const user = useShallowSelector(userSelector.getUser);
  const headRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [isMobile] = useBreakpoints([767]);

  const { breadcrumbs } = useBreadcrumbs();
  const dispatch = useDispatch();

  const handleChangeConnecting = useCallback(() => {
    if (!address.length) {
      dispatch(setActiveModal({
        activeModal: Modals.ConnectWallet,
        txHash: '',
        open: true,
      }));
    } else {
      disconnect();
    }
  }, [address.length, disconnect, dispatch]);

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
            searchValue={searchValue}
            isSearchResultsLoading={false}
            presearchedNfts={[]}
            onSearchValueChange={(e) => setSearchValue(e.currentTarget.value)}
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
          {address && <div className={s.address}>{sliceString(address)}</div>}
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
              <UserPopover
                disconnect={disconnect}
                {...user}
                visible={isUserShown}
                bodyRef={bodyRef}
              />
            </div>
          ) : (
            <Button
              className={cn(s.connect, { [s.mobileConnect]: isMobile })}
              onClick={handleChangeConnecting}
            >
              <img src={wallet} alt="wallet" />
              <img src={connect} alt="connect" className={s.connectIcon} />
            </Button>
          )}
        </div>
      </div>
      <Breadcrumbs paths={breadcrumbs} />
    </header>
  );
};

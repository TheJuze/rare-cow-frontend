/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';
import { Logo } from 'assets/icons';
import arrow from 'assets/chevron-down.svg';
import cn from 'classnames';

import { SearchInput, Dropdown, Avatar, UserPopover, Button, Text } from 'components';
import { useBreakpoints, useClickOutside, useShallowSelector } from 'hooks';
import { CategoryName, TDropdownValue, Modals, RequestStatus } from 'types';
import { sliceString } from 'utils';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import userSelector from 'store/user/selectors';
import wallet from 'assets/wallet.svg';
import connect from 'assets/connect.svg';
import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import { createDynamicLink, DEBOUNCE_DELAY, routes } from 'appConstants';
import nftSelector from 'store/nfts/selectors';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { presearchNfts } from 'store/nfts/actions';
import { debounce } from 'lodash';
import { clearPresearchedNfts } from 'store/nfts/reducer';
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
  isLight: boolean;
  setIsLight: (value: boolean) => void;
}

export const Header: VFC<HeaderProps> = ({ address, disconnect, isLight, setIsLight }) => {
  const { breadcrumbs, dynamicValues } = useBreadcrumbs();
  const exploreValue = useMemo(
    () => (dynamicValues[0]?.categoryName
      ? { id: '0', content: dynamicValues[0]?.categoryName.replaceAll('%20', ' ') }
      : { id: '0', content: 'Explore' }),
    [dynamicValues],
  );
  const [isUserShown, setIsUserShown] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownOptions: TDropdownValue[] = useMemo(
    () => [
      {
        id: 'all_categories',
        content: (
          <Link
            to={createDynamicLink(routes.nest.explore.path, {
              categoryName: CategoryName.allCategories,
            })}
          >
            <Text variant="body-2" color="metal800">
              All categories
            </Text>
          </Link>
        ),
      },
      {
        id: 'anime',
        content: (
          <Link
            to={createDynamicLink(routes.nest.explore.path, {
              categoryName: CategoryName.anime,
            })}
          >
            <Text variant="body-2" color="metal800">
              Anime illustration
            </Text>
          </Link>
        ),
      },
      {
        id: 'photo',
        content: (
          <Link
            to={createDynamicLink(routes.nest.explore.path, {
              categoryName: CategoryName.photo,
            })}
          >
            <Text variant="body-2" color="metal800">
              Photo
            </Text>
          </Link>
        ),
      },
      {
        id: 'art',
        content: (
          <Link
            to={createDynamicLink(routes.nest.explore.path, {
              categoryName: CategoryName.art,
            })}
          >
            <Text variant="body-2" color="metal800">
              Art
            </Text>
          </Link>
        ),
      },
      {
        id: 'music',
        content: (
          <Link
            to={createDynamicLink(routes.nest.explore.path, {
              categoryName: CategoryName.music,
            })}
          >
            <Text variant="body-2" color="metal800">
              Music
            </Text>
          </Link>
        ),
      },
      {
        id: 'picture',
        content: (
          <Link
            to={createDynamicLink(routes.nest.explore.path, {
              categoryName: CategoryName.picture,
            })}
          >
            <Text variant="body-2" color="metal800">
              Picture
            </Text>
          </Link>
        ),
      },
      {
        id: 'movie',
        content: (
          <Link
            to={createDynamicLink(routes.nest.explore.path, {
              categoryName: CategoryName.movie,
            })}
          >
            <Text variant="body-2" color="metal800">
              Movie
            </Text>
          </Link>
        ),
      },
    ],
    [],
  );

  const user = useShallowSelector(userSelector.getUser);
  const presearchedNfts = useShallowSelector(nftSelector.getProp('presearchedNfts'));
  const {
    [actionTypes.PRESEARCH_NFTS]: searchNftRequest,
  } = useShallowSelector(uiSelector.getUI);

  const isSearchResultsLoading = useMemo(
    () => searchNftRequest === RequestStatus.REQUEST,
    [searchNftRequest],
  );
  const headRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [isMobile] = useBreakpoints([767]);
  const dispatch = useDispatch();

  const handleChangeConnecting = useCallback(() => {
    if (!address.length) {
      dispatch(
        setActiveModal({
          activeModal: Modals.ConnectWallet,
          txHash: '',
          open: true,
        }),
      );
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

  const handleSearchClear = useCallback(() => {
    dispatch(clearPresearchedNfts());
    setSearchValue('');
  }, [dispatch]);

  const fetchSearchedNfts = useCallback((presearch: string) => {
    dispatch(presearchNfts({ presearch }));
  }, [dispatch]);

  const debouncedFetchSearchedNfts = useRef(debounce(fetchSearchedNfts, DEBOUNCE_DELAY)).current;

  const handleSearch = useCallback((event) => {
    const newSearchValue = event.target.value;
    if(!newSearchValue) {
      handleSearchClear();
      return;
    }

    setSearchValue(newSearchValue);
    debouncedFetchSearchedNfts(newSearchValue);
  }, [debouncedFetchSearchedNfts, handleSearchClear]);

  useClickOutside(bodyRef, handleHideUser, headRef);

  useEffect(
    () => () => {
      dispatch(clearPresearchedNfts());
    },
    [dispatch],
  );

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.headerLeft}>
          <Link to="/" className={cn(s.logoWrapper, { [s.closed]: isSearchActive })}>
            <Logo className={s.logo} />
          </Link>
          <SearchInput
            searchValue={searchValue}
            isSearchResultsLoading={isSearchResultsLoading}
            presearchedNfts={searchValue ? presearchedNfts : []}
            onSearchValueChange={handleSearch}
            classNameInput={s.headerInput}
            sendIsSearchActive={handleSearchActive}
            placeholder="NFT Name, ID"
          />
        </div>
        <div className={s.headerRight}>
          <Dropdown
            name="Explore"
            value={exploreValue}
            setValue={() => {}}
            options={dropdownOptions}
            variant="outlined"
            classNameHead={s.headerDropdown}
            dropPosition="absolute"
            closeOnSelect
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
                isLight={isLight}
                setIsLight={setIsLight}
                {...user}
                visible={isUserShown}
                bodyRef={bodyRef}
                onClose={handleHideUser}
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

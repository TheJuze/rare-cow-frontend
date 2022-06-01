/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';
import { FilterChips, TabBar, Text } from 'components';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  AboutMeIcon,
  BidedGrayIcon,
  CollectionsIcon,
  FavoritesIcon,
  ForSaleIcon,
  OwnedIcon,
  SoldIcon,
} from 'assets/icons/icons';
import { initialFiltersState, useBreakpoints, useFilters, useShallowSelector } from 'hooks';
import { createDynamicLink, DEBOUNCE_DELAY_100, routes } from 'appConstants';
import { RequestStatus, TBarOption } from 'types';
import cn from 'clsx';
import nftSelector from 'store/nfts/selectors';
import collectionsSelector from 'store/collections/selectors';
import { useDispatch } from 'react-redux';
import { getFilterForActiveTab } from 'utils';
import { debounce } from 'lodash';
import { clearNfts } from 'store/nfts/reducer';
import { searchNfts } from 'store/nfts/actions';
import { SearchNftReq } from 'types/requests';
import { clearCollections } from 'store/collections/reducer';
import { searchCollections } from 'store/collections/actions';
import actionTypes from 'store/collections/actionTypes';
import uiSelector from 'store/ui/selectors';
import profileActionTypes from 'store/profile/actionsTypes';
import { FilterButton } from '../FIlterButton';
import styles from './styles.module.scss';
import Tabs from '../Tabs';

interface IBodyProps {
  userId: string;
  bio?: string;
}

const Body: VFC<IBodyProps> = ({ userId, bio }) => {
  const tabs = useMemo<TBarOption[]>(
    () => [
      {
        value: '/about-me',
        name: 'About me',
        icon: <AboutMeIcon className="tab-bar__wrapper__body-tab-icon" />,
      },
      {
        value: '/owned',
        name: 'Owned',
        icon: <OwnedIcon />,
      },
      {
        value: '/for-sale',
        name: 'For sale',
        icon: <ForSaleIcon />,
      },
      {
        value: '/bided',
        name: 'Bided',
        icon: <BidedGrayIcon />,
      },
      {
        value: '/favorites',
        name: 'Favorites',
        icon: <FavoritesIcon />,
      },
      {
        value: '/collections',
        name: 'Collections',
        icon: <CollectionsIcon />,
      },
      {
        value: '/sold',
        name: 'Sold',
        icon: <SoldIcon />,
      },
    ],
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const nfts = useShallowSelector(nftSelector.getProp('nfts'));
  const totalPages = useShallowSelector(nftSelector.getProp('totalPages'));
  const collections = useShallowSelector(collectionsSelector.getProp('collections'));
  const {
    [actionTypes.SEARCH_COLLECTIONS]: isSerchingCollections,
    [profileActionTypes.GET_PROFILE]: isGettingProfile,
  } = useShallowSelector(uiSelector.getUI);
  const { pathname } = useLocation();
  const [isMobile] = useBreakpoints([541]);
  const navigate = useNavigate();
  const activeTab = useMemo(() => pathname.slice(pathname.lastIndexOf('/')), [pathname]);
  const isHideFiltersButton = useMemo(
    () => activeTab === '/about-me' || activeTab === '/collections',
    [activeTab],
  );
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [isShowChips, setIsShowChips] = useState(false);

  const isSearchCollectionsLoading = useMemo(
    () => isSerchingCollections === RequestStatus.REQUEST,
    [isSerchingCollections],
  );

  const isGettingProfileLoading = useMemo(
    () => isGettingProfile === RequestStatus.REQUEST,
    [isGettingProfile],
  );

  const [appliedFilters, setAppliedFilters] = useState(initialFiltersState);

  const { filters, handleChangeFilter, handleClearFilters } = useFilters();

  const isAppliedFilters = useMemo(
    () =>
      Boolean(
        appliedFilters.standart.length ||
          appliedFilters.isAuction ||
          appliedFilters.currency.length ||
          appliedFilters.orderBy ||
          appliedFilters.minPrice ||
          appliedFilters.maxPrice,
      ),
    [
      appliedFilters.currency.length,
      appliedFilters.isAuction,
      appliedFilters.maxPrice,
      appliedFilters.minPrice,
      appliedFilters.orderBy,
      appliedFilters.standart,
    ],
  );

  const onApply = useCallback(() => {
    setIsShowChips(true);
    setIsShowFilters(false);
    setAppliedFilters({ ...filters });
  }, [filters]);

  const handleDeleteChips = useCallback(
    (key, value) => {
      handleChangeFilter(key, value);
      setAppliedFilters({ ...appliedFilters, [key]: value });
    },
    [appliedFilters, handleChangeFilter],
  );

  const handleClearChips = useCallback(() => {
    handleClearFilters();
    setAppliedFilters(initialFiltersState);
  }, [handleClearFilters]);

  const handleTabChange = useCallback(
    (tabName: string) => {
      handleClearChips();
      navigate(`${createDynamicLink(routes.nest.profile.path, { userId })}${tabName}`);
    },
    [handleClearChips, navigate, userId],
  );

  const handleSearchNfts = useCallback(
    (filtersData: any, page: number, activeTabForSearch: string, id: string, shouldConcat?: boolean) => {
      if (!activeTabForSearch) return;
      if (activeTabForSearch === '/collections') {
        const requestData: any = { type: 'collections', page, creator: id };
        dispatch(searchCollections({ requestData }));
        return;
      }
      const requestData: SearchNftReq = {
        type: 'items',
        page,
        collections: filtersData?.collections?.join(','),
        currency: filtersData?.currency?.join(','),
        standart: filtersData?.standart?.join(','),
        max_price: filtersData?.maxPrice,
        min_price: filtersData?.minPrice,
        on_auc_sale: filtersData?.isAuction || undefined,
        order_by: filtersData?.orderBy || undefined,
        ...getFilterForActiveTab(activeTabForSearch.replaceAll('/', ''), id),
      };
      dispatch(searchNfts({ requestData, shouldConcat }));
    },
    [dispatch],
  );

  const debouncedHandleSearchNfts = useRef(debounce(handleSearchNfts, DEBOUNCE_DELAY_100)).current;

  const handleLoadMore = useCallback(
    (page: number, shouldConcat = false) => {
      handleSearchNfts(appliedFilters, page, activeTab, userId, shouldConcat);
    },
    [activeTab, appliedFilters, handleSearchNfts, userId],
  );

  const onLoadMoreClick = useCallback(
    (p: number) => {
      setCurrentPage(p);
      handleLoadMore(p, true);
    },
    [handleLoadMore],
  );

  useEffect(
    () => () => {
      dispatch(clearCollections());
    },
    [dispatch],
  );
  useEffect(() => {
    debouncedHandleSearchNfts(appliedFilters, 1, activeTab, userId);
    setCurrentPage(1);
  }, [debouncedHandleSearchNfts, appliedFilters, activeTab, userId]);

  useEffect(
    () => () => {
      dispatch(clearNfts());
    },
    [dispatch],
  );

  return (
    <div className={styles.body}>
      <div className={styles.bodyTop}>
        {!isMobile && isShowChips && isAppliedFilters && (
          <div className={styles.total}>
            <Text color="metal800" align="left" className={styles.totalText}>
              Total({nfts.length})
            </Text>
            <FilterChips
              className={styles.chips}
              filters={appliedFilters}
              handleChangeFilter={handleDeleteChips}
              handleClearFilters={handleClearChips}
              isAppliedFilters={isAppliedFilters}
            />
          </div>
        )}
      </div>
      <div className={styles.bodyContent}>
        <TabBar
          rootPath={routes.nest.profile.path}
          options={tabs}
          align={isMobile ? 'horizontal' : 'vertical'}
          activeTab={activeTab}
          onChange={handleTabChange}
          className={cn({ [styles.desktopTabs]: !isMobile && !isHideFiltersButton })}
        />
        <div className={styles.bodyContentInfo}>
          {!isHideFiltersButton && (
            <div className={styles.filterButton}>
              <FilterButton
                isShowFilters={isShowFilters}
                setIsShowFilters={setIsShowFilters}
                filters={filters}
                onApply={onApply}
                handleChangeFilter={handleChangeFilter}
                handleClearChips={handleClearChips}
              />
            </div>
          )}
          <Tabs
            bio={bio}
            setIsShowFilters={setIsShowFilters}
            isShowChips={isShowChips}
            isAppliedFilters={isAppliedFilters}
            appliedFilters={appliedFilters}
            handleDeleteChips={handleDeleteChips}
            handleClearChips={handleClearChips}
            nfts={nfts}
            totalPages={totalPages}
            onLoadMoreClick={onLoadMoreClick}
            currentPage={currentPage}
            collections={collections}
            isSearchCollectionsLoading={isSearchCollectionsLoading}
            isGettingProfileLoading={isGettingProfileLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;

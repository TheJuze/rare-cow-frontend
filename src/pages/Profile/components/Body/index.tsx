/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState, VFC } from 'react';
import { CollectionsList, FilterChips, TabBar, Text } from 'components';

import { nfts } from 'components/ArtCard/ArtCard.mock';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  AboutMeIcon,
  BidedGrayIcon,
  CollectionsIcon,
  FavoritesIcon,
  ForSaleIcon,
  OwnedIcon,
  SoldIcon,
} from 'assets/icons/icons';
import { initialFiltersState, useBreakpoints, useFilters } from 'hooks';
import { createDynamicLink, routes } from 'appConstants';
import { TBarOption } from 'types';
import { collectionsMock } from 'pages/Home/components/TopCollections';
import cn from 'clsx';
import styles from './styles.module.scss';
import Nfts from '../Nfts';
import { FilterButton } from '../FIlterButton';

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
    [appliedFilters.currency.length, appliedFilters.isAuction, appliedFilters.maxPrice, appliedFilters.minPrice, appliedFilters.orderBy, appliedFilters.standart],
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
            <FilterButton isShowFilters={isShowFilters} setIsShowFilters={setIsShowFilters} filters={filters} onApply={onApply} handleChangeFilter={handleChangeFilter} handleClearChips={handleClearChips} />
          </div>
          )}
          <Routes>
            <Route
              path="about-me"
              element={
                <div className={styles.bio}>
                  <Text className={styles.bioTitle} color="dark">
                    Profile Information
                  </Text>
                  <Text className={styles.bioInfo} variant="body-2" color="dark">
                    {bio || 'There is no bio on this profile yet'}
                  </Text>
                </div>
            }
            />
            <Route
              path="owned"
              element={
                <Nfts
                  setIsShowFilters={setIsShowFilters}
                  isShowChips={isShowChips}
                  isAppliedFilters={isAppliedFilters}
                  appliedFilters={appliedFilters}
                  handleDeleteChips={handleDeleteChips}
                  handleClearChips={handleClearChips}
                  nfts={nfts}
                />
            }
            />
            <Route
              path="for-sale"
              element={
                <Nfts
                  setIsShowFilters={setIsShowFilters}
                  isShowChips={isShowChips}
                  isAppliedFilters={isAppliedFilters}
                  appliedFilters={appliedFilters}
                  handleDeleteChips={handleDeleteChips}
                  handleClearChips={handleClearChips}
                  nfts={nfts}
                />
            }
            />
            <Route
              path="bided"
              element={
                <Nfts
                  setIsShowFilters={setIsShowFilters}
                  isShowChips={isShowChips}
                  isAppliedFilters={isAppliedFilters}
                  appliedFilters={appliedFilters}
                  handleDeleteChips={handleDeleteChips}
                  handleClearChips={handleClearChips}
                  nfts={nfts}
                />
            }
            />
            <Route
              path="favorites"
              element={
                <Nfts
                  setIsShowFilters={setIsShowFilters}
                  isShowChips={isShowChips}
                  isAppliedFilters={isAppliedFilters}
                  appliedFilters={appliedFilters}
                  handleDeleteChips={handleDeleteChips}
                  handleClearChips={handleClearChips}
                  nfts={nfts}
                />
            }
            />
            <Route path="collections" element={<CollectionsList collections={collectionsMock} />} />
            <Route
              path="sold"
              element={
                <Nfts
                  setIsShowFilters={setIsShowFilters}
                  isShowChips={isShowChips}
                  isAppliedFilters={isAppliedFilters}
                  appliedFilters={appliedFilters}
                  handleDeleteChips={handleDeleteChips}
                  handleClearChips={handleClearChips}
                  nfts={nfts}
                />
            }
            />
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default Body;

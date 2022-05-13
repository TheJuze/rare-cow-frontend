/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Button, CollectionsList, FilterChips, TabBar, Text } from 'components';

import { nfts } from 'components/ArtCard/ArtCard.mock';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  AboutMeIcon,
  BidedGrayIcon,
  CollectionsIcon,
  FavoritesIcon,
  FiltersIcon,
  ForSaleIcon,
  OwnedIcon,
  SoldIcon,
} from 'assets/icons/icons';
import { useBreakpoints, useFilters } from 'hooks';
import { Filters } from 'containers/Filters/Filters';
import { createDynamicLink, routes } from 'appConstants';
import { TBarOption } from 'types';
import { collections } from 'pages/Home/components/TopCollections';
import styles from './styles.module.scss';
import Nfts from '../Nfts';

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
  const [appliedFilters, setAppliedFilters] = useState({
    ERC721: false,
    ERC1155: false,
    isAuction: false,
    currency: [],
    price: '',
    date: '',
    likes: '',
    minPrice: '',
    maxPrice: '',
  });
  const { filters, handleChangeFilter, handleClearFilters } = useFilters();
  const isAppliedFilters = useMemo(
    () =>
      Boolean(
        appliedFilters.ERC721 ||
          appliedFilters.ERC1155 ||
          appliedFilters.isAuction ||
          appliedFilters.currency.length ||
          appliedFilters.price ||
          appliedFilters.date ||
          appliedFilters.likes ||
          appliedFilters.minPrice ||
          appliedFilters.maxPrice,
      ),
    [
      appliedFilters.ERC1155,
      appliedFilters.ERC721,
      appliedFilters.currency.length,
      appliedFilters.date,
      appliedFilters.isAuction,
      appliedFilters.likes,
      appliedFilters.maxPrice,
      appliedFilters.minPrice,
      appliedFilters.price,
    ],
  );

  const onApply = useCallback(() => {
    setIsShowChips(true);
    setIsShowFilters(false);
    setAppliedFilters({ ...filters });
  }, [filters]);

  const handlDeleteChips = useCallback(
    (key, value) => {
      handleChangeFilter(key, value);
      setAppliedFilters({ ...appliedFilters, [key]: value });
    },
    [appliedFilters, handleChangeFilter],
  );

  const handleClearChips = useCallback(() => {
    handleClearFilters();
    setAppliedFilters({
      ERC721: false,
      ERC1155: false,
      isAuction: false,
      currency: [],
      price: '',
      date: '',
      likes: '',
      minPrice: '',
      maxPrice: '',
    });
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
        {!isMobile && !isHideFiltersButton && (
          <Button
            size="sm"
            variant="filled"
            startAdornment={<FiltersIcon />}
            className={styles.filters}
            onClick={() => setIsShowFilters(true)}
          >
            <Text color="metal700">Filters</Text>
          </Button>
        )}

        {!isMobile && isShowChips && isAppliedFilters && (
          <div className={styles.total}>
            <Text color="metal800" align="left" className={styles.totalText}>
              Total({nfts.length})
            </Text>
            <FilterChips
              className={styles.chips}
              filters={appliedFilters}
              handleChangeFilter={handlDeleteChips}
              handleClearFilters={handleClearChips}
              isAppliedFilters={isAppliedFilters}
            />
          </div>
        )}
      </div>
      <div className={styles.bodyContent}>
        <Filters
          filters={filters}
          isShowFilters={isShowFilters}
          handleChangeFilter={handleChangeFilter}
          onClose={onApply}
          handleClearFilters={handleClearChips}
          isButtonOny
          isWithCollections={false}
        />
        <TabBar
          rootPath={routes.nest.profile.path}
          options={tabs}
          align={isMobile ? 'horizontal' : 'vertical'}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
        <Routes>
          <Route
            path="about-me"
            element={
              <div className={styles.bio}>
                <Text className={styles.bioTitle} color="dark">
                  Profile Information
                </Text>
                <Text variant="body-2" color="dark">
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
                handlDeleteChips={handlDeleteChips}
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
                handlDeleteChips={handlDeleteChips}
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
                handlDeleteChips={handlDeleteChips}
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
                handlDeleteChips={handlDeleteChips}
                handleClearChips={handleClearChips}
                nfts={nfts}
              />
            }
          />
          <Route path="collections" element={<CollectionsList collections={collections} />} />
          <Route
            path="sold"
            element={
              <Nfts
                setIsShowFilters={setIsShowFilters}
                isShowChips={isShowChips}
                isAppliedFilters={isAppliedFilters}
                appliedFilters={appliedFilters}
                handlDeleteChips={handlDeleteChips}
                handleClearChips={handleClearChips}
                nfts={nfts}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Body;

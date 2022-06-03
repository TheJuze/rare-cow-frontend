/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
import { CollectionsList, Loader, Text } from 'components';
import React, { VFC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Collection, TokenFull } from 'types/api';
import Nfts from '../Nfts';
import styles from './styles.module.scss';

interface ITabsProps {
  bio: string;
  setIsShowFilters: (state: boolean) => void;
  isShowChips: boolean;
  isAppliedFilters: boolean;
  appliedFilters: any;
  handleDeleteChips: (key: string, value: string) => void;
  handleClearChips: () => void;
  nfts: TokenFull[];
  totalPages: number;
  onLoadMoreClick: (page: number) => void;
  currentPage: number;
  collections: Collection[];
  isSearchCollectionsLoading: boolean;
  isGettingProfileLoading: boolean;
}
const Tabs: VFC<ITabsProps> = ({
  bio,
  setIsShowFilters,
  isShowChips,
  isAppliedFilters,
  appliedFilters,
  handleDeleteChips,
  handleClearChips,
  nfts,
  totalPages,
  onLoadMoreClick,
  currentPage,
  collections,
  isSearchCollectionsLoading,
  isGettingProfileLoading,
}) => (
  <>
    <Routes>
      <Route
        path="about-me"
        element={
          <div className={styles.bio}>
            {isGettingProfileLoading ? (
              <Loader />
            ) : (
              <>
                <Text className={styles.bioTitle} color="darkDefault">
                  Profile Information
                </Text>
                <Text className={styles.bioInfo} variant="body-2" color="darkDefault">
                  {bio || 'There is no bio on this profile yet'}
                </Text>
              </>
            )}
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
            totalPages={totalPages}
            onLoadMoreClick={onLoadMoreClick}
            currentPage={currentPage}
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
            totalPages={totalPages}
            onLoadMoreClick={onLoadMoreClick}
            currentPage={currentPage}
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
            totalPages={totalPages}
            onLoadMoreClick={onLoadMoreClick}
            currentPage={currentPage}
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
            totalPages={totalPages}
            onLoadMoreClick={onLoadMoreClick}
            currentPage={currentPage}
          />
        }
      />
      <Route
        path="collections"
        element={
          <CollectionsList isLoading={isSearchCollectionsLoading} collections={collections} />
        }
      />
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
            totalPages={totalPages}
            onLoadMoreClick={onLoadMoreClick}
            currentPage={currentPage}
          />
        }
      />
    </Routes>
  </>
);

export default Tabs;

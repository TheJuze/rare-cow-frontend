/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { VFC } from 'react';
import { Outlet } from 'react-router-dom';
import { Collection, TokenFull } from 'types/api';

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
  <Outlet
    context={{
      bio,
      setIsShowFilters,
      isShowChips,
      isAppliedFilters,
      appliedFilters,
      handleDeleteChips,
      handleClearChips,
      nfts,
      onLoadMoreClick,
      currentPage,
      collections,
      isSearchCollectionsLoading,
      isGettingProfileLoading,
      totalPages,
    }}
  />
);

export default Tabs;

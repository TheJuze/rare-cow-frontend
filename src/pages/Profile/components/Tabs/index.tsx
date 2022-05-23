/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
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
  onLoadMoreClick: (page: number) => void;
  currentPage: number;
  collections: Collection[];
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
  onLoadMoreClick,
  currentPage,
  collections,
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
    }}
  />
);

export default Tabs;

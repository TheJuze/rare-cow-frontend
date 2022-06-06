/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, VFC } from 'react';
import { Button, FilterChips, NftList, Text } from 'components';

import { useBreakpoints, useShallowSelector } from 'hooks';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';

interface INftsProps {
  setIsShowFilters: any;
  isShowChips: boolean;
  isAppliedFilters: boolean;
  appliedFilters: any;
  handleDeleteChips: any;
  handleClearChips: any;
  nfts: any;
  totalPages: number;
  onLoadMoreClick: (value: number) => void;
  currentPage: number;
}

const Nfts: VFC<INftsProps> = ({
  isShowChips,
  isAppliedFilters,
  appliedFilters,
  handleDeleteChips,
  handleClearChips,
  nfts,
  totalPages,
  onLoadMoreClick,
  currentPage,
}) => {
  const { [actionTypes.SEARCH_NFTS]: getNftsRequestStatus } = useShallowSelector(uiSelector.getUI);

  const isNftsLoading = useMemo(
    () => getNftsRequestStatus === RequestStatus.REQUEST,
    [getNftsRequestStatus],
  );
  const [isMobile] = useBreakpoints([541]);

  return (
    <div className={styles.nfts}>
      {isMobile && isShowChips && isAppliedFilters && (
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
      <NftList nfts={nfts} currentPage={currentPage} />
      {!isNftsLoading && currentPage < totalPages && (
        <Button
          className={styles.load}
          onClick={() => onLoadMoreClick(currentPage + 1)}
          variant="outlined"
        >
          <Text className={styles.loadText} color="accent">
            Load more
          </Text>
        </Button>
      )}
    </div>
  );
};

export default Nfts;

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Button, FilterChips, NftList, Text } from 'components';

import { FiltersIcon } from 'assets/icons/icons';
import { initialFiltersState, useFilters } from 'hooks';
import { Filters } from 'containers/Filters/Filters';
import { TokenFull } from 'types/api';
import styles from './styles.module.scss';

interface IBodyProps {
  nfts: TokenFull[];
  currentPage: number;
  totalPages: number;
  isNftsLoading: boolean;
  onLoadMoreClick: (page: number) => void;
}

const Body: VFC<IBodyProps> = ({
  nfts,
  currentPage,
  totalPages,
  isNftsLoading,
  onLoadMoreClick,
}) => {
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
    [
      appliedFilters.currency.length,
      appliedFilters.isAuction,
      appliedFilters.maxPrice,
      appliedFilters.minPrice,
      appliedFilters.orderBy,
      appliedFilters.standart.length,
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
    setAppliedFilters(initialFiltersState);
  }, [handleClearFilters]);

  return (
    <div className={styles.body}>
      <div className={styles.bodyTop}>
        <Button
          size="sm"
          variant="filled"
          startAdornment={<FiltersIcon />}
          className={styles.filters}
          onClick={() => setIsShowFilters(true)}
        >
          <Text color="metal700">Filters</Text>
        </Button>
      </div>
      {isShowChips && isAppliedFilters && (
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
      <div className={styles.bodyContent}>
        <Filters
          filters={filters}
          isShowFilters={isShowFilters}
          handleChangeFilter={handleChangeFilter}
          onClose={onApply}
          handleClearFilters={handleClearChips}
          isWithCollections={false}
        />
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
    </div>
  );
};

export default Body;

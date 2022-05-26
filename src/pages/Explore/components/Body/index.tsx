/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';
import { Button, FilterChips, NftList, SearchCollection, Text } from 'components';

import { FiltersIcon } from 'assets/icons/icons';
import { initialFiltersState, useFilters, useShallowSelector } from 'hooks';
import { Filters } from 'containers/Filters/Filters';
import collectionsSelector from 'store/collections/selectors';
import { useDispatch } from 'react-redux';
import { searchCollections } from 'store/collections/actions';
import { clearCollections } from 'store/collections/reducer';
import { Category } from 'types/api';
import nftSelector from 'store/nfts/selectors';
import { SearchNftReq } from 'types/requests';
import { searchNfts } from 'store/nfts/actions';
import { debounce } from 'lodash';
import { DEBOUNCE_DELAY_100 } from 'appConstants';
import { clearNfts } from 'store/nfts/reducer';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';

interface IBodyProps {
  category: Category;
}

const Body: VFC<IBodyProps> = ({ category }) => {
  const dispatch = useDispatch();
  const collections = useShallowSelector(collectionsSelector.getProp('collections'));
  const totalCollectionsPages = useShallowSelector(collectionsSelector.getProp('totalPages'));
  const nftCards = useShallowSelector(nftSelector.getProp('nfts'));
  const totalPages = useShallowSelector(nftSelector.getProp('totalPages'));
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCollectionsPage, setCurrentCollectionsPage] = useState(1);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [isShowChips, setIsShowChips] = useState(false);
  const [collectionsText, setCollectionsText] = useState('');
  const [appliedFilters, setAppliedFilters] = useState(initialFiltersState);
  const { filters, handleChangeFilter, handleClearFilters } = useFilters();
  const { [actionTypes.SEARCH_NFTS]: getNftsRequestStatus } = useShallowSelector(uiSelector.getUI);

  const isNftsLoading = useMemo(
    () => getNftsRequestStatus === RequestStatus.REQUEST,
    [getNftsRequestStatus],
  );
  const isAppliedFilters = useMemo(
    () =>
      Boolean(
        appliedFilters.standart.length ||
          appliedFilters.isAuction ||
          appliedFilters.currency.length ||
          appliedFilters.collections.length ||
          appliedFilters.orderBy ||
          appliedFilters.minPrice ||
          appliedFilters.maxPrice,
      ),
    [
      appliedFilters.standart.length,
      appliedFilters.collections.length,
      appliedFilters.currency.length,
      appliedFilters.isAuction,
      appliedFilters.maxPrice,
      appliedFilters.minPrice,
      appliedFilters.orderBy,
    ],
  );

  const handleSearchCollections = useCallback(
    ({ page, text }, currPage?: number, currText?: string) => {
      let shouldConcat = false;
      const requestData: any = { type: 'collections', page, text };
      if ((text && text === currText) || (page && page !== currPage) || page === 1) {
        shouldConcat = true;
      }
      dispatch(searchCollections({ requestData, shouldConcat }));
      if (text || text === '') {
        setCollectionsText(text);
      }
      setCurrentCollectionsPage(page || 1);
    },
    [dispatch],
  );

  const debouncedHandleSearchCollections = useRef(
    debounce(handleSearchCollections, DEBOUNCE_DELAY_100),
  ).current;

  const handleChangeCollectionsText = useCallback((text: string) => {
    setCollectionsText(text);
    debouncedHandleSearchCollections({ text }, currentCollectionsPage, collectionsText);
  }, [collectionsText, currentCollectionsPage, debouncedHandleSearchCollections]);

  useEffect(() => {
    debouncedHandleSearchCollections({ page: 1 });
  }, [debouncedHandleSearchCollections]);

  useEffect(
    () => () => {
      dispatch(clearCollections());
    },
    [dispatch],
  );

  const handleSearchNfts = useCallback(
    (filtersData: any, tags: number, page: number, shouldConcat?: boolean) => {
      const requestData: SearchNftReq = {
        type: 'items',
        tags,
        page,
        collections: filtersData?.collections?.join(','),
        currency: filtersData?.currency?.join(','),
        standart: filtersData?.standart?.join(','),
        max_price: filtersData?.maxPrice,
        min_price: filtersData?.minPrice,
        on_auc_sale: filtersData?.isAuction || undefined,
        order_by: filtersData?.orderBy || undefined,
      };
      dispatch(searchNfts({ requestData, shouldConcat }));
    },
    [dispatch],
  );

  const debouncedHandleSearchNfts = useRef(debounce(handleSearchNfts, DEBOUNCE_DELAY_100)).current;

  const handleLoadMore = useCallback(
    (page: number, shouldConcat = false) => {
      handleSearchNfts(appliedFilters, category?.id, page, shouldConcat);
    },
    [appliedFilters, category?.id, handleSearchNfts],
  );

  useEffect(() => {
    debouncedHandleSearchNfts(appliedFilters, category?.id, 1);
    setCurrentPage(1);
  }, [debouncedHandleSearchNfts, appliedFilters, category?.id]);

  useEffect(
    () => () => {
      dispatch(clearNfts());
    },
    [dispatch],
  );

  const handleCollectionChange = useCallback(
    (newCollection) => {
      handleChangeFilter(
        'collections',
        filters.collections.includes(newCollection)
          ? filters.collections.filter((currentCollection) => currentCollection !== newCollection)
          : [...filters.collections, newCollection],
      );
    },
    [filters.collections, handleChangeFilter],
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

  const onLoadMoreClick = useCallback(
    (p: number) => {
      setCurrentPage(p);
      handleLoadMore(p, true);
    },
    [handleLoadMore],
  );

  return (
    <div className={styles.body}>
      <div className={styles.bodyTop}>
        <Button
          size="sm"
          variant="filled"
          startAdornment={<FiltersIcon className={styles.filtersIcon} />}
          className={styles.filters}
          onClick={() => setIsShowFilters(true)}
        >
          <Text color="metal700" className={styles.filtersText}>
            Filters
          </Text>
        </Button>
        <SearchCollection
          collections={collections}
          className={styles.collections}
          activeCollections={filters.collections}
          handleClickCollection={handleCollectionChange}
          disabled={isNftsLoading && !nftCards?.length}
          searchValue={collectionsText}
          setSearchValue={handleChangeCollectionsText}
          currentPage={currentCollectionsPage}
          totalPages={totalCollectionsPages}
          onLoadMore={(page: number) => debouncedHandleSearchCollections({ page }, currentCollectionsPage, collectionsText)}
        />
      </div>
      {isShowChips && isAppliedFilters && (
        <div className={styles.total}>
          <Text color="metal800" align="left" className={styles.totalText}>
            Total({nftCards.length})
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
          allCollections={collections}
          searchCollectionsDisabled={isNftsLoading && !nftCards?.length}
          searchValue={collectionsText}
          currentCollectionsPage={currentCollectionsPage}
          totalCollectionsPages={totalCollectionsPages}
          setSearchValue={handleChangeCollectionsText}
          onLoadMore={(page: number) => debouncedHandleSearchCollections({ page }, currentCollectionsPage, collectionsText)}
        />
        <div className={styles.bodyResultsWrapper}>
          <NftList nfts={nftCards} currentPage={currentPage} />
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
    </div>
  );
};

export default Body;

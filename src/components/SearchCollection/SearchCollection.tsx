/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line object-curly-newline
import React, { useCallback, useRef, useState, VFC } from 'react';
import { Loader, Text } from 'components';
import cn from 'clsx';

import { ChevronDown } from 'assets/icons/icons';
import { SearchInput } from 'components/SearchInput';
import { Checkbox } from 'components/Checkbox';
import { Avatar } from 'components/Avatar';
import { useClickOutside, useShallowSelector } from 'hooks';
import { Button } from 'components/Button';
import actionTypes from 'store/collections/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';

export interface SearchCollectionProps {
  className?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  collections: any;
  activeCollections: any;
  handleClickCollection: any;
  disabled?: boolean;
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onLoadMore?: (page: number) => void;
}

export const SearchCollection: VFC<SearchCollectionProps> = ({
  className,
  collections,
  activeCollections,
  handleClickCollection,
  disabled = false,
  searchValue,
  setSearchValue,
  isLoading,
  currentPage,
  totalPages,
  onLoadMore,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { [actionTypes.SEARCH_COLLECTIONS]: getCollectionsRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const headRef = useRef<any>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const handleHideCollections = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  useClickOutside(bodyRef, handleHideCollections, headRef);
  const handleChangeSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);
  return (
    <div className={cn(styles.searchCollection, className)}>
      <div
        className={styles.searchCollectionButton}
        onClick={disabled ? null : () => setIsMenuOpen(!isMenuOpen)}
        ref={headRef}
      >
        <Text variant="body-2" color="light1">
          Collections
        </Text>
        <ChevronDown className={cn(styles.arrow, { [styles.reverted]: isMenuOpen })} />
      </div>

      <div className={cn(styles.body, { [styles.open]: isMenuOpen })} ref={bodyRef}>
        <SearchInput
          searchValue={searchValue}
          isSearchResultsLoading={false}
          presearchedNfts={[]}
          onSearchValueChange={(e) => handleChangeSearch(e.currentTarget.value)}
          placeholder="Search..."
          className={styles.search}
        />
        <div className={styles.collections}>
          {collections?.length ? (
            collections.map((collection) => (
              <div className={styles.collectionsItem}>
                <Checkbox
                  id={collection.url}
                  value={activeCollections.includes(collection.name)}
                  onChange={() => handleClickCollection(collection.name)}
                />
                <Avatar
                  size={36}
                  avatar={collection.avatar}
                  isCollection
                  id={collection.url}
                  className={styles.avatar}
                />
                <Text weight="normal" size="xs" className={styles.name}>
                  {collection.name}
                </Text>
              </div>
            ))
          ) : (
            <Text>No collections for your request</Text>
          )}
          {getCollectionsRequestStatus === RequestStatus.REQUEST && currentPage < totalPages && (
            <Loader className={styles.loader} />
          )}
          {!isLoading && currentPage < totalPages && (
            <Button
              className={styles.load}
              onClick={() => onLoadMore(currentPage + 1)}
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

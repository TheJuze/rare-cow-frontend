/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line object-curly-newline
import React, { useCallback, useRef, useState, VFC } from 'react';
import { Text } from 'components';
import cn from 'clsx';

import { ChevronDown } from 'assets/icons/icons';
import { SearchInput } from 'components/SearchInput';
import { Checkbox } from 'components/Checkbox';
import { Avatar } from 'components/Avatar';
import { useClickOutside } from 'hooks';
import styles from './styles.module.scss';

export interface SearchCollectionProps {
  className?: string;
  collections: any;
  activeCollections: any;
  handleClickCollection: any;
}

export const SearchCollection: VFC<SearchCollectionProps> = ({
  className,
  collections,
  activeCollections,
  handleClickCollection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headRef = useRef<any>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const handleHideCollections = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  useClickOutside(bodyRef, handleHideCollections, headRef);
  return (
    <div className={cn(styles.searchCollection, className)}>
      <div
        className={styles.searchCollectionButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        ref={headRef}
      >
        <Text variant="body-2" color="light1">
          Collections
        </Text>
        <ChevronDown className={cn(styles.arrow, { [styles.reverted]: isMenuOpen })} />
      </div>

      <div className={cn(styles.body, { [styles.open]: isMenuOpen })} ref={bodyRef}>
        <SearchInput
          searchValue=""
          isSearchResultsLoading={false}
          presearchedNfts={[]}
          onSearchValueChange={() => {}}
          placeholder="Search..."
          className={styles.search}
        />
        <div className={styles.collections}>
          {collections.map((collection) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

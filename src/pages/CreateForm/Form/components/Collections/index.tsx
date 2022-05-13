/* eslint-disable max-len */
import React, {
  FormEvent, useCallback, useEffect, useMemo, useState, VFC,
} from 'react';

import cn from 'classnames';

import {
  Avatar, Button, Checkbox, Dropdown, Text,
} from 'components';

import { Collection } from 'types/api/Collection';

import { createDynamicLink, routes, standardsMap } from 'appConstants';
import { useSearch, useShallowSelector } from 'hooks';
import { TrashIcon } from 'assets/icons/icons';
import { HighlightedText } from 'components/HighlightedText';
import userSelector from 'store/user/selectors';
import nftSelector from 'store/nfts/selectors';
import styles from './styles.module.scss';

interface ICollections {
  initCollections: Collection[];
  setSelectedCollection: (collections: Collection[]) => void;
  isCollectionsAdded: boolean;
  setIsCollectionsAdded: (state: boolean) => void;
  onBlur?: (e: FormEvent<HTMLDivElement>) => void;
  isClearing?: boolean;
  type: string;
}

interface ISelectedCollections {
  collection: Collection;
  onDelete: (id: string) => void;
}

const SelectedCollections: VFC<ISelectedCollections> = ({ collection, onDelete }) => (
  <div className={styles.selectedWrapper}>
    <Avatar
      size={36}
      avatar={collection.avatar}
      isCollection
      id={collection.url}
      className={styles.avatar}
      withShadow
      withAnim={false}
    />
    <Text color="dark0" variant="body-2">
      {collection.name}
    </Text>
    <Button
      className={styles.selectedDelete}
      variant="text"
      onClick={() => onDelete(collection.url)}
      icon={<TrashIcon />}
      size="lg"
    />
  </div>
);

const Collections: VFC<ICollections> = ({
  initCollections,
  setSelectedCollection,
  isCollectionsAdded,
  setIsCollectionsAdded,
  // onBlur,
  isClearing,
  type,
}) => {
  const id = useShallowSelector(userSelector.getProp('id'));
  const { collections: searchedCollections } = useShallowSelector(
    nftSelector.getProp('searchData'),
  );
  const [collections, setCollections] = useState(initCollections);
  const [selected, setSelected] = useState<Collection[]>([]);
  const searchValues = useSearch('', {
    requestData: { type: 'collections', standart: type, creator: id?.toString() },
  });

  useEffect(() => {
    setSelectedCollection(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const isSelected = useCallback(
    (url: string) => selected.findIndex((s) => s.url === url) !== -1,
    [selected],
  );

  useEffect(() => {
    if (isClearing) {
      setSelected([]);
    }
  }, [isClearing]);

  useEffect(() => {
    setCollections(initCollections);
  }, [initCollections]);

  const setIsSelected = useCallback(
    (collection: Collection) => {
      if (isSelected(collection.url || '')) {
        const newSelected = selected.filter((c) => c.url !== collection.url);
        setSelected(newSelected);
      } else {
        setSelected([collection]);
      }
    },
    [isSelected, selected],
  );

  useEffect(() => {
    setSelected([]);
  }, [isCollectionsAdded]);

  const filteredCollections = useMemo(
    () => (searchValues.searchValue ? searchedCollections : collections),
    [collections, searchValues.searchValue, searchedCollections],
  );

  const dropdownCollections = useMemo(
    () => filteredCollections.filter((c) => !c.isDefault && c.standart === type).map((collection) => ({
      id: collection.url,
      content: (
        <div className={styles.collectionsItem}>
          <Checkbox
            id={collection.url}
            value={isSelected(collection.url)}
            onChange={() => setIsSelected(collection)}
          />
          <Avatar
            size={36}
            avatar={collection.avatar}
            isCollection
            id={collection.url}
            className={styles.avatar}
          />
          {searchValues.searchValue ? (
            <HighlightedText text={collection.name} filter={searchValues.searchValue} />
          ) : (
            <Text weight="normal" size="xs" className={styles.name}>
              {collection.name}
            </Text>
          )}
        </div>
      ),
    })),
    [filteredCollections, isSelected, searchValues.searchValue, setIsSelected, type],
  );

  return (
    <section className={styles['collection-section__wrapper']}>
      <div className={styles['collection-section__wrapper__title']}>
        <Checkbox
          id="is-collection-added"
          value={isCollectionsAdded}
          onChange={() => setIsCollectionsAdded(!isCollectionsAdded)}
          className={styles['selector-btn']}
        >
          <Text weight="normal" color="dark0">
            Add to collection
          </Text>
        </Checkbox>
      </div>
      <div
        className={cn(styles['collection-section__wrapper__body'], {
          [styles['collections-active']]: isCollectionsAdded,
        })}
      >
        <Dropdown
          value={null}
          placeholder="Change collection"
          setValue={() => {}}
          name="collections"
          options={dropdownCollections}
          withSearch
          label="Collection"
          dropPosition="absolute"
          variant="outlined"
          {...searchValues}
        />
        <div>
          {selected.filter((c) => !c.isDefault).map((selectedCollection) => (
            <SelectedCollections
              collection={selectedCollection}
              onDelete={() => setIsSelected(selectedCollection)}
            />
          ))}
        </div>
        <Button
          className={styles['collection-section__wrapper__add']}
          to={createDynamicLink(routes.nest.create.nest.collection.path, {
            type: standardsMap[type].toLowerCase(),
          })}
          size="sm"
        >
          Create new collection
          <span className={styles['collection-section__wrapper__add-body__detail']}>&#43;</span>
        </Button>
      </div>
    </section>
  );
};

export default Collections;

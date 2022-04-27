import React, {
  FormEvent, useCallback, useEffect, useState, VFC,
} from 'react';

import cn from 'classnames';

import { Button, Checkbox, Text } from 'components';

import { Collection } from 'types/api/Collection';

import { createDynamicLink, routes } from 'appConstants';
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

const Collections: VFC<ICollections> = ({
  initCollections,
  setSelectedCollection,
  isCollectionsAdded,
  setIsCollectionsAdded,
  // onBlur,
  isClearing,
  type,
}) => {
  const [collections, setCollections] = useState(initCollections);
  const [selected, setSelected] = useState<Collection[]>([]);

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

  useEffect(() => {
    const defaultCollection = collections.find((c) => c.isDefault);
    if (defaultCollection) {
      if (!isCollectionsAdded && !isSelected(defaultCollection.url || '')) {
        setIsSelected(defaultCollection);
      }
    }
  }, [collections, isCollectionsAdded, isSelected, setIsSelected]);

  return (
    <section className={styles['collection-section__wrapper']}>
      <div className={styles['collection-section__wrapper__title']}>
        <Checkbox
          id="is-collection-added"
          value={isCollectionsAdded}
          onChange={(e) => setIsCollectionsAdded(!e.currentTarget.checked)}
          className={styles['selector-btn']}
        />
        <Text weight="normal" color="dark0">
          Add to collection
        </Text>
      </div>
      <div
        className={cn(styles['collection-section__wrapper__body'], {
          [styles['collections-active']]: isCollectionsAdded,
        })}
      >
        ldmfldmf
      </div>
      {isCollectionsAdded && (
        <Button to={createDynamicLink(routes.nest.create.nest.collection.path, { type })} size="sm">
          <Text weight="bold" size="s">
            Create new collection +
          </Text>

          <span className={styles['collection-section__wrapper__add-body__detail']}>&#43;</span>
        </Button>
      )}
    </section>
  );
};

export default Collections;

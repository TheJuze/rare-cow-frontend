/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import React, { useMemo, VFC } from 'react';

import cx from 'classnames';

import { ArtCardSkeleton, CollectionCard, Text } from 'components';
import styles from './styles.module.scss';

export interface CollectionsListProps {
  className?: string;
  collections: any[];
  columns?: number;
  isLoading?: boolean;
  skeletonsCount?: number;
  currentPage?: number;
}

export const CollectionsList: VFC<CollectionsListProps> = ({
  className,
  collections,
  columns = 3,
  isLoading,
  skeletonsCount = 15,
  currentPage = 1,
}) => {
  const skeleton = Array.from(Array(skeletonsCount).keys()).map((element) => (
    <ArtCardSkeleton className={styles.collectionSkeleton} key={element} />
  ));
  const elements = collections.map((collection: any, index: number) => (
    <CollectionCard
      key={collection.name || collection.collection?.name}
      avatar={collection.avatar || collection.collection?.avatar || ''}
      id={collection.url || collection.collection?.url || 0}
      index={index + 1}
      name={collection.name || collection.collection?.name || ''}
      currency={collection.currency?.image || collection.collection?.currency?.image}
      price={collection?.floorPrice}
    />
  ));

  const returnedElements = useMemo(() => {
    let els;
    if (isLoading) {
      if (currentPage === 1) {
        els = skeleton;
      }
      if (currentPage > 1) {
        els = [...elements, ...skeleton];
      }
    }
    if (!isLoading) {
      els = elements.length ? (
        elements
      ) : (
        <Text align="center" variant="subtitle-1" color="darkDefault">
          No Collections found for your request
        </Text>
      );
    }
    return els;
  }, [currentPage, elements, isLoading, skeleton]);
  return (
    <ol
      className={cx(styles.collectionsList, className)}
      style={{
        gridTemplateColumns: `repeat(${
          collections.length > columns || isLoading ? columns : collections.length
        }, 1fr)`,
      }}
    >
      {returnedElements}
    </ol>
  );
};

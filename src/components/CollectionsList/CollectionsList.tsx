/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';

import cx from 'classnames';

import { CollectionCard } from 'components';
import BigNumber from 'bignumber.js';
import styles from './styles.module.scss';

export interface CollectionsListProps {
  className?: string;
  collections: any[];
  columns?: number;
}

export const CollectionsList: VFC<CollectionsListProps> = ({
  className,
  collections,
  columns = 3,
}) => {
  return (
    <ol
      className={cx(styles.collectionsList, className)}
      style={{
        gridTemplateColumns: `repeat(${collections.length > columns ? columns : collections.length}, 1fr)`,
      }}
    >
      {collections.map((collection: any, index: number) => (
        <CollectionCard
          key={collection.collection?.name}
          avatar={collection.collection?.avatar || ''}
          id={collection.collection?.url || 0}
          index={index + 1}
          name={collection.collection?.name || ''}
          currency={collection.currency.image}
          price={
            new BigNumber(collection?.floorPrice || '0').isEqualTo(0)
              ? '< 0.01'
              : new BigNumber(collection?.floorPrice).toString() || 0
          }
        />
      ))}
    </ol>
  );
};

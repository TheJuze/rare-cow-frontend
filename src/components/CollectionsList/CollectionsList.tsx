/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';

import cx from 'classnames';

import { CollectionCard } from 'components';
import BigNumber from 'bignumber.js';
import { CollectionSlim } from 'types/api';
import { getTokenAmountDisplay } from 'utils';
import styles from './styles.module.scss';

export interface CollectionsListProps {
  className?: string;
  collections: CollectionSlim[];
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
      {collections.map((collection, index: number) => (
        <CollectionCard
          key={collection?.name}
          avatar={collection?.avatar || ''}
          id={collection?.url || 0}
          index={index + 1}
          name={collection?.name || ''}
          currency="punch backenders to add currency field to the view"
          price={
            new BigNumber(collection?.floorPrice || '0').isEqualTo(0)
              ? '< 0.01'
              : getTokenAmountDisplay(collection?.floorPrice) || 0
          }
        />
      ))}
    </ol>
  );
};

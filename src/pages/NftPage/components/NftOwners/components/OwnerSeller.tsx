import { Avatar, Text, Button } from 'components';
import React, { VFC } from 'react';
import { Ownership } from 'types/api';
import styles from '../styles.module.scss';

interface IOwnerSeller {
  owner: Ownership;
  isSelling?: boolean;
}

export const OwnerSeller: VFC<IOwnerSeller> = ({ owner, isSelling = false }) => (
  <div className={styles.owner}>
    <div className={styles.left}>
      <Avatar size={40} avatar={owner.avatar} id={owner.url} withShadow />
      <div className={styles.ownerInfo}>
        <Text variant="body-2" color="dark" weight="semiBold">
          {owner.name}
        </Text>
        {isSelling && (
        <Text size="xs" color="metal400" tag="span">
          {owner.sellingQuantity}/{owner.quantity} on sale for{' '}
          <Text size="xs" color="accent" weight="semiBold" tag="span">
            {owner.price} {owner.currency.symbol}
          </Text>{' '}
          each
        </Text>
        )}
      </div>
    </div>
    {isSelling && <Button size="sm">Buy</Button>}
  </div>
);

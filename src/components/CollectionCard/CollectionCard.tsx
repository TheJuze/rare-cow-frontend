/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';
import BigNumber from 'bignumber.js';

import cx from 'classnames';

import { Avatar, Text } from 'components';

import { formatDigits } from 'utils';
import styles from './styles.module.scss';

export interface CollectionCardProps {
  index?: number;
  avatar: string;
  id: number | string;
  name: string;
  price: string | number | null;
  currency: string;
  profitIncrease?: string | number;
  className?: string;
}

export const CollectionCard: VFC<CollectionCardProps> = ({
  index,
  avatar,
  id,
  name,
  price,
  profitIncrease,
  className,
}) => {
  return (
    <li className={cx(styles.collectionCard, className)}>
      {index && (
        <Text weight="bold" color="darkDefault" className={styles.index}>
          {index}
        </Text>
      )}
      <Avatar avatar={avatar} id={id} isCollection size={56} className={styles.avatar} />
      <div className={styles.info}>
        <Text variant="body-2" color="darkDefault" className={styles.name}>
          {name}
        </Text>
        {price ? (
          <div className={styles.price}>
            <Text tag="span" variant="medium-body" weight="bold" color="iris100">
              Floor price:
            </Text>
            <Text tag="span" size="xs" color="accent" weight="bold">
              {' '}
              {new BigNumber(price || '0').isEqualTo(0) ? '< 0.01' : formatDigits(+price)} $
            </Text>
          </div>
        ) : null}
      </div>
      {profitIncrease && (
        <div className={styles.profitIncreaseWrapper}>
          <Text className={styles.profitIncreaseValue} size="m">
            {profitIncrease}%
          </Text>
        </div>
      )}
    </li>
  );
};

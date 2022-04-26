/* eslint-disable arrow-body-style */
import React, { FC } from 'react';

import cx from 'classnames';

import { Avatar, Text } from 'components';

import styles from './styles.module.scss';

interface IProps {
  index?: number;
  avatar: string;
  id: number | string;
  name: string;
  price: string | number | null;
  currency: string;
  profitIncrease?: string | number;
  className?: string;
}

const CollectionCard: FC<IProps> = ({
  index,
  avatar,
  id,
  name,
  price,
  currency,
  profitIncrease,
  className,
}) => {
  return (
    <li className={cx(styles.collectionCard, className)}>
      {index && (
        <Text weight="bold" color="dark" className={styles.index}>
          {index}
        </Text>
      )}
      <Avatar avatar={avatar} id={id} isCollection size={56} className={styles.avatar} />
      <div className={styles.info}>
        <Text variant="body-2" color="dark" className={styles.name}>
          {name}
        </Text>
        {price ? (
          <Text variant="medium-body" weight="bold" color="iris100" className={styles.price}>
            Floor price:
            <img src={currency} alt="currency" className={styles.currency} />
            <Text size="xs" color="accent" weight="bold" className={styles.price}>
              {' '}
              {price}
            </Text>
          </Text>
        ) : (
          <></>
        )}
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
export default CollectionCard;

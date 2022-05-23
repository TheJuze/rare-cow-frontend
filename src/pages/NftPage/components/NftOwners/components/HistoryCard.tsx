import { Avatar, Text } from 'components';
import moment from 'moment';
import React, { useCallback, VFC } from 'react';
import { TokenHistory } from 'types/api';
import { getTokenAmountDisplay, sliceString } from 'utils';

import styles from '../styles.module.scss';

interface IHistoryCard {
  historyItem: TokenHistory,
}

export const HistoryCard:VFC<IHistoryCard> = ({ historyItem }) => {
  const getMethod = useCallback((method: string) => {
    switch (method) {
      case 'Listing':
        return 'Listed';
      case 'Buy':
        return 'Bought';

      default:
        return `${method}ed`;
    }
  }, []);

  return (
    <div className={styles.historyItem}>
      <Avatar
        size={40}
        avatar={historyItem.newOwner?.avatar || historyItem.oldOwner?.avatar}
        id={historyItem.newOwner?.url || historyItem.oldOwner?.url}
        withShadow
      />
      <div className={styles.historyItemInfo}>
        {historyItem.price ? (
          <Text size="xs" color="light1">
            {getMethod(historyItem.method)} for{' '}
            <Text color="accent" size="xs" weight="semiBold" tag="span">
              {getTokenAmountDisplay(historyItem.price)}{' '}
              {historyItem.currency.symbol}
            </Text>
          </Text>
        ) : (
          <Text>{getMethod(historyItem.method)}</Text>
        )}
        <Text size="xs" color="light3">
          by{' '}
          <Text size="xs" color="light1" tag="span">
            {sliceString(
              historyItem.newOwner?.address || historyItem.oldOwner?.address,
              6,
              4,
            )}
          </Text>{' '}
          {moment().from(historyItem.date)}
        </Text>
      </div>
    </div>
  );
};

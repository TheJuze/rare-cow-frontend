import React, { VFC } from 'react';
import { Promotion, PromotionStatus, PromotionType } from 'types/api';

import cn from 'clsx';

import { ClockIcon } from 'assets/icons/icons';
import { Text } from 'components';
import moment from 'moment';
import styles from './styles.module.scss';

interface IPromotionStatusBar {
  promotionInfo: Promotion
}

export const PromotionStatusBar: VFC<IPromotionStatusBar> = ({ promotionInfo }) => {
  if (!promotionInfo) {
    return null;
  }
  if(promotionInfo.status === PromotionStatus.Finished) {
    return null;
  }
  if(promotionInfo.status === PromotionStatus.InProgress) {
    const left = promotionInfo.type === PromotionType.Premium ? `${moment(promotionInfo.validUntil).fromNow().slice(2)} left` : `${promotionInfo.clicksLeft} clicks left`;
    return (
      <div className={cn(styles.wrapper, styles.promote)}>
        <ClockIcon className={styles.icon} />
        <Text size="xs" color="accent">{promotionInfo.status}. {left}</Text>
      </div>
    );
  }
  return (
    <div className={cn(styles.wrapper, styles.queued)}>
      <ClockIcon className={styles.icon} />
      <Text size="xs" color="metal600">{promotionInfo.status}. {+promotionInfo.queue !== 0 ? `There are ${promotionInfo.queue} NFTs before yours.` : 'Your NFT is next'}</Text>
    </div>
  );
};

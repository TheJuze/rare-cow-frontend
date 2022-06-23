import React, { VFC } from 'react';

import cn from 'clsx';

import { useTimeLeft } from 'hooks';
import { Text } from 'components';
import moment from 'moment';
import styles from './styles.module.scss';

export interface CountdownProps {
  className?: string;
  onEnd?: () => void;
  endAuction: number;
}

export const Countdown: VFC<CountdownProps> = ({ className, endAuction, onEnd }) => {
  const timeLeft = useTimeLeft(endAuction * 1000);
  if (!timeLeft) {
    onEnd?.();
    return (
      <div className={styles.countdownTitle}>
        <Text size="m" weight="semiBold">
          Timed auction ended
        </Text>
      </div>
    );
  }

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div className={cn(styles.countdown, className)}>
      <div className={styles.countdownTitle}>
        <Text variant="body-2" color="metal600">
          Sale ends at {moment(endAuction, 'X').format('MMMM Do YYYY, h:mma')}
        </Text>
      </div>
      <div className={styles.time}>
        <div className={styles.timeItem}>
          <Text className={styles.timeText} color="accent" weight="semiBold">
            {hours}
          </Text>
          <Text className={styles.timeText} weight="semiBold">Hours</Text>
        </div>
        <div className={styles.timeItem}>
          <Text className={styles.timeText} color="accent" weight="semiBold">
            {minutes}
          </Text>
          <Text className={styles.timeText} weight="semiBold">Minutes</Text>
        </div>
        <div className={styles.timeItem}>
          <Text className={styles.timeText} color="accent" weight="semiBold">
            {seconds}
          </Text>
          <Text className={styles.timeText} weight="semiBold">Seconds</Text>
        </div>
      </div>
    </div>
  );
};

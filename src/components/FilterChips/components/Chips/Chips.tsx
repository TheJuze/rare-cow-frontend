/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { VFC } from 'react';

import cn from 'clsx';
import { Text } from 'components/Typography';
import { CloseIcon } from 'assets/icons/icons';
import styles from './styles.module.scss';

export interface ChipsProps {
  className?: string;
  label: any;
  onClose: () => void;
}

export const Chips: VFC<ChipsProps> = ({ className, label, onClose }) => {
  return (
    <div className={cn(styles.chips, className)} onClick={onClose}>
      <Text className={styles.chipsText} color="metal600" size="xs">{label}</Text>
      <CloseIcon className={styles.chipsIcon} />
    </div>
  );
};

import React, { VFC } from 'react';
import { ChevronDown } from 'assets/icons/icons';
import cn from 'clsx';
import styles from './styles.module.scss';

interface ArrowLabelProps {
  direction?: 'left' | 'right';
  className?: string;
}

export const ArrowLabel: VFC<ArrowLabelProps> = ({
  direction = 'left',
  className,
}) => (
  <ChevronDown className={cn(styles[direction], className)} />
);

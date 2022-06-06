import React, { VFC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cn from 'clsx';

import styles from './styles.module.scss';

export interface ArtCardSkeletonProps {
  className?: string;
  key: number | string;
  height?: number;
}

export const ArtCardSkeleton: VFC<ArtCardSkeletonProps> = ({ className, key, height }) => (
  <Skeleton
    height={height ? `${height}px` : '380px'}
    key={key}
    containerClassName={styles.skeletonWrapper}
    className={cn(className, styles.skeleton, 'react-loading-skeleton')}
  />
);

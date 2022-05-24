import React, { VFC } from 'react';
import Skeleton from 'react-loading-skeleton';

import cn from 'clsx';

import styles from './styles.module.scss';

export interface ArtCardSkeletonProps {
  className?: string;
  key: number | string;
}

export const ArtCardSkeleton: VFC<ArtCardSkeletonProps> = ({ className, key }) => (
  <Skeleton height="300px" key={key} className={cn(className, styles.skeleton)} />
);

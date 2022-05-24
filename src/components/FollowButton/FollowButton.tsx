import React, { VFC } from 'react';

import cn from 'clsx';

import { Button, Text } from 'components';
import styles from './styles.module.scss';

export interface FollowButtonProps {
  className?: string;
  isFollowing: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const FollowButton: VFC<FollowButtonProps> = ({
  className,
  isFollowing,
  onClick,
  disabled,
}) => (
  <Button
    className={cn(styles.followButton, className)}
    onClick={() => onClick()}
    disabled={disabled}
  >
    <Text variant="body-2" color="light">{isFollowing ? 'Unfollow' : 'Follow'}</Text>
  </Button>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line object-curly-newline
import React, { VFC } from 'react';
import { Text } from 'components';
import cn from 'clsx';

import { Checkbox } from 'components/Checkbox';
import { Avatar } from 'components/Avatar';
import styles from './styles.module.scss';

export interface CollectionCardProps {
  className?: string;
  url: string;
  isActive: boolean;
  name: string;
  avatar: string;
  handleClickCollection: (name: string) => void;
}

export const CollectionCard: VFC<CollectionCardProps> = ({
  className,
  url,
  isActive,
  name,
  avatar,
  handleClickCollection,
}) => (
  <div className={cn(styles.collectionCard, className)}>
    <Checkbox id={url} value={isActive} onChange={() => handleClickCollection(name)} />
    <Avatar size={36} avatar={avatar} isCollection id={url} className={styles.avatar} />
    <Text weight="normal" size="xs" className={styles.name}>
      {name}
    </Text>
  </div>
);

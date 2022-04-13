/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';

import cn from 'clsx';

import { Avatar } from 'components/Avatar';
import { Text } from 'components/Typography';
import { Link } from 'react-router-dom';
import { PenIcon } from 'assets/icons/icons';
import { usdt } from 'assets/img';
import Clipboard from 'components/Clipboard/Clipboard';
import styles from './styles.module.scss';

const balances = [
  {
    value: 213.12,
    icon: usdt,
  },
  {
    value: 23.34,
    icon: usdt,
  },
];

export interface UserPopoverProps {
  className?: string;
  id: string | number;
  avatar: string;
  name?: string;
  visible: boolean;
}

export const UserPopover: VFC<UserPopoverProps> = ({ className, id, avatar, name, visible }) => {
  return (
    <div className={cn(styles.userPopover, className, { [styles.visible]: visible })}>
      <div className={styles.head}>
        <div className={styles.headUser}>
          <Avatar id={id} avatar={avatar} size="40" />
          <Text className={styles.headUserName}>{name || 'User name'}</Text>
        </div>
        <Link to="/" className={styles.edit}>
          <Text variant="body-2" className={styles.editText}>
            Edit
          </Text>
          <PenIcon className={styles.editIcon} />
        </Link>
      </div>
      <div className={styles.balance}>
        {balances.map((balance) => (
          <div className={styles.balanceItem}>
            <img src={balance.icon} alt="" className={styles.balanceItemIcon} />
            <Text size="xs">{balance.value}</Text>
          </div>
        ))}
      </div>
      <Clipboard name="address" value="0xc78CD789D1483189C919A8d4dd22004CFD867Eb4" />
    </div>
  );
};

/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { useCallback, useState, VFC } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'clsx';

import { Avatar } from 'components/Avatar';
import { Text } from 'components/Typography';
import { Link } from 'react-router-dom';
import {
  BidedIcon,
  CollectionsIcon,
  CreateNFT,
  FavoritesIcon,
  ForSaleIcon,
  LightTheme,
  OwnedIcon,
  PenIcon,
  SoldIcon,
} from 'assets/icons/icons';
import { usdt } from 'assets/img';
import Clipboard from 'components/Clipboard/Clipboard';
import { Dropdown } from 'components/Dropdown';
import { TDropdownValue } from 'types/components/dropdown';
import { Switch } from 'components/Switch';
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

const dropdownOptions: TDropdownValue[] = [
  {
    id: 'single',
    content: <Link to="/">Single NFT</Link>,
  },
  {
    id: 'multiple',
    content: <Link to="/">Multiple NFT</Link>,
  },
  {
    id: 'collection',
    content: <Link to="/">Collection</Link>,
  },
];

const links = [
  {
    value: '/owned',
    name: 'Owned',
    icon: <OwnedIcon />,
  },
  {
    value: '/for-sale',
    name: 'For sale',
    icon: <ForSaleIcon />,
  },
  {
    value: '/bided',
    name: 'Bided',
    icon: <BidedIcon />,
  },
  {
    value: '/favorites',
    name: 'Favorites',
    icon: <FavoritesIcon />,
  },
  {
    value: '/collections',
    name: 'Collections',
    icon: <CollectionsIcon />,
  },
  {
    value: '/sold',
    name: 'Sold',
    icon: <SoldIcon />,
  },
];

export interface UserPopoverProps {
  className?: string;
  id: string | number;
  avatar: string;
  name?: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const UserPopover: VFC<UserPopoverProps> = ({
  className,
  id,
  avatar,
  name,
  visible,
  setVisible,
}) => {
  const [isLight, setIsLight] = useState(true);

  const handleChangeTheme = useCallback((value: boolean) => {
    setIsLight(value);
  }, []);
  return (
    <OutsideClickHandler onOutsideClick={setVisible}>
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
        <Dropdown
          name="create"
          setValue={() => {}}
          value={{
            id: '0',
            content: (
              <div className={styles.dropdownHead}>
                <CreateNFT />
                <Text align="left">Create</Text>
              </div>
            ),
          }}
          options={dropdownOptions}
          variant="outlined"
          className={styles.dropdown}
          classNameHead={styles.dropdownWrapper}
          dropVariant="head"
        />
        <div className={styles.links}>
          {links.map((link) => (
            <Link to={link.value} className={styles.link}>
              {link.icon}
              <Text>{link.name}</Text>
            </Link>
          ))}
        </div>
        <div className={styles.theme}>
          <Switch checked={isLight} onChange={() => handleChangeTheme(!isLight)} size="sm" />
          <LightTheme />
          <Text>{isLight ? 'Light' : 'Dark'}</Text>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

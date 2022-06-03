/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useMemo, VFC } from 'react';

import cn from 'clsx';

import { Avatar } from 'components/Avatar';
import { Text } from 'components/Typography';
import { Link, useLocation } from 'react-router-dom';
import {
  BidedIcon,
  CollectionsIcon,
  CreateNFT,
  ExitSVG,
  FavoritesIcon,
  ForSaleIcon,
  LightTheme,
  OwnedIcon,
  PenIcon,
  SoldIcon,
} from 'assets/icons/icons';
import Clipboard from 'components/Clipboard/Clipboard';
import { Dropdown } from 'components/Dropdown';
import { TDropdownValue } from 'types/components/dropdown';
import { Switch } from 'components/Switch';
import { createDynamicLink, currenciesIconsMap, routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import styles from './styles.module.scss';

const links = [
  {
    value: 'owned',
    name: 'Owned',
    icon: <OwnedIcon />,
  },
  {
    value: 'forSale',
    name: 'For sale',
    icon: <ForSaleIcon />,
  },
  {
    value: 'bided',
    name: 'Bided',
    icon: <BidedIcon />,
  },
  {
    value: 'favorites',
    name: 'Favorites',
    icon: <FavoritesIcon />,
  },
  {
    value: 'collections',
    name: 'Collections',
    icon: <CollectionsIcon />,
  },
  {
    value: 'sold',
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
  bodyRef: any;
  address: string;
  disconnect: () => void;
  onClose: () => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export const UserPopover: VFC<UserPopoverProps> = ({
  className,
  id,
  avatar,
  name,
  visible,
  bodyRef,
  address,
  disconnect,
  onClose,
  isDark,
  setIsDark,
}) => {
  const { pathname } = useLocation();
  const balance = useShallowSelector(userSelector.getProp('balance'));
  const mappedBalance = useMemo(
    () => Object.entries(balance).map(([token, value]) => ({
      value,
      icon: currenciesIconsMap[token],
    })),
    [balance],
  );

  const dropdownOptions: TDropdownValue[] = useMemo(
    () => [
      {
        id: 'single',
        content: (
          <Link to={createDynamicLink(routes.nest.create.nest.single.path, {})}>
            <Text variant="body-2" color="metal800">
              Single NFT
            </Text>
          </Link>
        ),
      },
      {
        id: 'multiple',
        content: (
          <Link to={createDynamicLink(routes.nest.create.nest.multiple.path, {})}>
            <Text variant="body-2" color="metal800">
              Multiple NFT
            </Text>
          </Link>
        ),
      },
      {
        id: 'collection',
        content: (
          <Link to={createDynamicLink(routes.nest.create.nest.collection.path, { type: 'single' })}>
            <Text variant="body-2" color="metal800">
              Collection
            </Text>
          </Link>
        ),
      },
    ],
    [],
  );

  const handleChangeTheme = useCallback((value: boolean) => {
    setIsDark(value);
  }, [setIsDark]);

  useEffect(() => {
    onClose();
  }, [onClose, pathname]);
  return (
    <div ref={bodyRef} className={cn(styles.userPopover, className, { [styles.visible]: visible })}>
      <div className={styles.head}>
        <div className={styles.headUser}>
          <Avatar id={id} avatar={avatar} size="40" />
          <Text className={styles.headUserName}>{name}</Text>
        </div>
        <Link
          to={createDynamicLink(routes.nest.profile.nest.edit.path, { userId: id })}
          className={styles.edit}
        >
          <Text variant="body-2" className={styles.editText}>
            Edit
          </Text>
          <PenIcon className={styles.editIcon} />
        </Link>
      </div>
      <div className={styles.balance}>
        {mappedBalance.map(({ icon, value }) => (
          <div className={styles.balanceItem}>
            <img src={icon} alt="" className={styles.balanceItemIcon} />
            <Text size="xs">{value}</Text>
          </div>
        ))}
      </div>
      <Clipboard name="address" value={address} />
      <Dropdown
        name="create"
        setValue={() => {}}
        value={{
          id: '0',
          content: (
            <div className={styles.dropdownHead}>
              <CreateNFT />
              <Text weight="normal" color="metal800" align="left">
                Create
              </Text>
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
          <Link
            to={createDynamicLink(routes.nest.profile.nest[link.value]?.path, { userId: id })}
            className={styles.link}
          >
            {link.icon}
            <Text weight="normal" color="metal800">
              {link.name}
            </Text>
          </Link>
        ))}
        <button onClick={disconnect} type="button" className={styles.link}>
          <ExitSVG />
          <Text weight="normal" color="metal800">
            Disconnect
          </Text>
        </button>
      </div>
      <div className={styles.theme}>
        <Switch checked={isDark} onChange={() => handleChangeTheme(!isDark)} size="sm" />
        <LightTheme />
        <Text>{isDark ? 'Dark' : 'Light'}</Text>
      </div>
    </div>
  );
};

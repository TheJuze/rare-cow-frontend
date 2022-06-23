/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { VFC } from 'react';
import { Avatar, Button, FollowButton, Text } from 'components';
import Clipboard from 'components/Clipboard/Clipboard';

import { createDynamicLink, routes } from 'appConstants';
import { nullAvatar } from 'assets/img';
import { sliceString } from 'utils';
import styles from './styles.module.scss';
import Socials from '../Socials';

interface IHeaderProps {
  id: number | string;
  isMobile: boolean;
  userId: string | number;
  avatar?: string;
  name?: string;
  followersCount?: number;
  followsCount?: number;
  isUser: boolean;
  address?: string;
  isFollowingInProcess?: boolean;
  handleFollowUser: (id: string | number) => void;
  handleUnfollowUser: (id: string | number) => void;
  balance?: any[];
  isFollowing?: boolean;
  hasSocials: boolean;
  email?: string;
  site?: string;
  twitter?: string;
  instagram?: string;
}

const Header: VFC<IHeaderProps> = ({
  id,
  isMobile,
  userId,
  avatar,
  name,
  followersCount,
  followsCount,
  isUser,
  address,
  isFollowingInProcess,
  handleFollowUser,
  handleUnfollowUser,
  balance,
  isFollowing,
  hasSocials,
  email,
  site,
  twitter,
  instagram,
}) => {
  if (isMobile) {
    return (
      <div className={styles.header}>
        <Avatar size={112} id={userId} avatar={avatar || nullAvatar} />
        <div className={styles.right}>
          <div className={styles.info}>
            {name ? (
              <Text variant="subtitle-1" color="base900">
                {name?.length > 15 ? sliceString(name, 7, 5) : name}
              </Text>
            ) : (
              <Text variant="subtitle-1" color="base900">
                User {userId}
              </Text>
            )}
            <div className={styles.following}>
              <Button
                to={createDynamicLink(routes.nest.followers.path, { userId })}
                className={styles.followers}
                variant="outlined"
                size="sm"
                disabled={!followersCount}
              >
                <Text size="xs" weight="medium" color="accent">
                  {followersCount || 0} followers
                </Text>
              </Button>
              <Button
                to={createDynamicLink(routes.nest.following.path, { userId })}
                className={styles.follows}
                variant="outlined"
                disabled={!followsCount}
              >
                <Text size="xs" weight="medium" color="yellow500">
                  {followsCount || 0} following
                </Text>
              </Button>
            </div>
            {isUser ? (
              <div className={styles.balances}>
                {balance.map(({ icon, value }) => (
                  <div className={styles.balanceItem}>
                    <img src={icon} alt="" className={styles.balanceItemIcon} />
                    <Text weight="medium" color="darkDefault" className={styles.balanceText}>
                      {value}
                    </Text>
                  </div>
                ))}
              </div>
            ) : null}
            {address ? <Clipboard name={address} value={address} /> : null}
            {isUser ? (
              <Button
                to={createDynamicLink(routes.nest.profile.nest.edit.path, { userId })}
                className={styles.edit}
              >
                Edit profile
              </Button>
            ) : (
              <FollowButton
                disabled={isFollowingInProcess || !id}
                onClick={() => (isFollowing ? handleUnfollowUser(userId) : handleFollowUser(userId))}
                isFollowing={isFollowing}
                className={styles.edit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <Avatar size={112} id={userId} avatar={avatar || nullAvatar} />
      <div className={styles.right}>
        <div className={styles.info}>
          {name ? (
            <Text variant="subtitle-1" color="base900">
              {name?.length > 15 ? sliceString(name, 7, 5) : name}
            </Text>
          ) : (
            <Text variant="subtitle-1" color="base900">
              User {userId}
            </Text>
          )}
          <div className={styles.following}>
            <Button
              to={createDynamicLink(routes.nest.followers.path, { userId })}
              className={styles.followers}
              variant="outlined"
              size="sm"
              disabled={!followersCount}
            >
              <Text size="xs" weight="medium" color="accent">
                {followersCount || 0} followers
              </Text>
            </Button>
            <Button
              to={createDynamicLink(routes.nest.following.path, { userId })}
              className={styles.follows}
              variant="outlined"
              disabled={!followsCount}
            >
              <Text size="xs" weight="medium" color="yellow500">
                {followsCount || 0} following
              </Text>
            </Button>
          </div>
          {isUser ? (
            <div className={styles.balances}>
              {balance.map(({ icon, value }) => (
                <div className={styles.balanceItem}>
                  <img src={icon} alt="" className={styles.balanceItemIcon} />
                  <Text weight="medium" color="darkDefault" className={styles.balanceText}>
                    {value}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}
          {address ? <Clipboard name={address} value={address} /> : null}
          {isUser ? (
            <Button
              to={createDynamicLink(routes.nest.profile.nest.edit.path, { userId })}
              className={styles.edit}
            >
              Edit profile
            </Button>
          ) : (
            <FollowButton
              disabled={isFollowingInProcess || !id}
              onClick={() => (isFollowing ? handleUnfollowUser(userId) : handleFollowUser(userId))}
              isFollowing={isFollowing}
              className={styles.edit}
            />
          )}
        </div>
        <Socials
          hasSocials={hasSocials}
          email={email}
          site={site}
          twitter={twitter}
          instagram={instagram}
        />
      </div>
    </div>
  );
};

export default Header;

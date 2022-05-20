/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, FollowButton, Text } from 'components';
import Clipboard from 'components/Clipboard/Clipboard';
import useShallowSelector from 'hooks/useShallowSelector';
import React, { ReactText, useCallback, useEffect, useMemo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { follow, getProfileById, unfollow } from 'store/profile/actions';
import profileSelector from 'store/profile/selectors';
import userSelector from 'store/user/selectors';
import { useWalletConnectorContext } from 'services';

import { nullAvatar } from 'assets/img';
import { sliceString } from 'utils';
import {
  GlobeOutlinedIcon,
  InstagramOutlinedIcon,
  MailOutlinedIcon,
  TwitterOutlinedIcon,
} from 'assets/icons/icons';
import { useBreakpoints } from 'hooks';
import { createDynamicLink, currenciesIconsMap, routes } from 'appConstants';
import uiSelector from 'store/ui/selectors';
import profileActionTypes from 'store/profile/actionsTypes';
import { RequestStatus } from 'types';
import { Body } from './components';

import styles from './styles.module.scss';

const Profile: VFC = () => {
  const [isMobile] = useBreakpoints([767]);
  const { walletService } = useWalletConnectorContext();
  const { userId } = useParams();
  const id = useShallowSelector(userSelector.getProp('id'));
  const isUser = useMemo(() => String(userId) === String(id), [id, userId]);
  const balance = useShallowSelector(userSelector.getProp('balance'));
  const {
    [profileActionTypes.FOLLOW]: followRequestStatus,
    [profileActionTypes.UNFOLLOW]: unfollowRequestStatus,
  } = useShallowSelector(uiSelector.getUI);
  const {
    avatar,
    name,
    address,
    followersCount,
    followsCount,
    email,
    site,
    instagram,
    twitter,
    bio,
    isFollowing,
  } = useShallowSelector(profileSelector.getProfile);
  const dispatch = useDispatch();
  const hasSocials = useMemo(
    () => Boolean(email || site || instagram || twitter),
    [email, instagram, site, twitter],
  );

  const mappedBalance = useMemo(
    () => Object.entries(balance).map(([token, value]) => ({
      value,
      icon: currenciesIconsMap[token],
    })),
    [balance],
  );

  const handleFollowUser = useCallback(
    (userIdToFollow: ReactText) => {
      dispatch(follow({ id: userIdToFollow }));
    },
    [dispatch],
  );

  const handleUnfollowUser = useCallback(
    (userIdToUnfollow: ReactText) => {
      dispatch(unfollow({ id: userIdToUnfollow }));
    },
    [dispatch],
  );

  const isFollowingInProcess = useMemo(
    () => [followRequestStatus, unfollowRequestStatus].includes(
      RequestStatus.REQUEST,
    ),
    [followRequestStatus, unfollowRequestStatus],
  );

  useEffect(() => {
    if (userId) {
      dispatch(getProfileById({ id: userId, web3Provider: walletService.Web3() }));
    }
  }, [dispatch, userId, walletService]);

  if (isMobile) {
    return (
      <div className={styles.profile}>
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
                  {mappedBalance.map(({ icon, value }) => (
                    <div className={styles.balanceItem}>
                      <img src={icon} alt="" className={styles.balanceItemIcon} />
                      <Text weight="medium" color="dark" className={styles.balanceText}>
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
                  disabled={isFollowingInProcess}
                  onClick={() => (isFollowing ?
                    handleUnfollowUser(userId) : handleFollowUser(userId))}
                  isFollowing={isFollowing}
                  className={styles.edit}
                />
              )}
            </div>
          </div>
        </div>
        <Body userId={userId} bio={bio} />

        {hasSocials && (
          <div className={styles.socials}>
            {email ? (
              <div className={styles.socialsItem}>
                <div className={styles.socialsIcon}>
                  <MailOutlinedIcon />
                </div>
                <Text variant="body-2" color="base900">
                  {email}
                </Text>
              </div>
            ) : null}
            {site ? (
              <div className={styles.socialsItem}>
                <div className={styles.socialsIcon}>
                  <GlobeOutlinedIcon />
                </div>
                <Text variant="body-2" color="base900">
                  {site}
                </Text>
              </div>
            ) : null}
            {twitter ? (
              <div className={styles.socialsItem}>
                <div className={styles.socialsIcon}>
                  <TwitterOutlinedIcon />
                </div>
                <Text variant="body-2" color="base900">
                  {twitter}
                </Text>
              </div>
            ) : null}
            {instagram ? (
              <div className={styles.socialsItem}>
                <div className={styles.socialsIcon}>
                  <InstagramOutlinedIcon />
                </div>
                <Text variant="body-2" color="base900">
                  {instagram}
                </Text>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={styles.profile}>
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
                {mappedBalance.map(({ icon, value }) => (
                  <div className={styles.balanceItem}>
                    <img src={icon} alt="" className={styles.balanceItemIcon} />
                    <Text weight="medium" color="dark" className={styles.balanceText}>
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
                disabled={isFollowingInProcess}
                onClick={() => (isFollowing ?
                  handleUnfollowUser(userId) : handleFollowUser(userId))}
                isFollowing={isFollowing}
                className={styles.edit}
              />
            )}
          </div>
          {hasSocials && (
            <div className={styles.socials}>
              {email ? (
                <div className={styles.socialsItem}>
                  <div className={styles.socialsIcon}>
                    <MailOutlinedIcon />
                  </div>
                  <Text variant="body-2" color="base900">
                    {email}
                  </Text>
                </div>
              ) : null}
              {site ? (
                <div className={styles.socialsItem}>
                  <div className={styles.socialsIcon}>
                    <GlobeOutlinedIcon />
                  </div>
                  <Text variant="body-2" color="base900">
                    {site}
                  </Text>
                </div>
              ) : null}
              {twitter ? (
                <div className={styles.socialsItem}>
                  <div className={styles.socialsIcon}>
                    <TwitterOutlinedIcon />
                  </div>
                  <Text variant="body-2" color="base900">
                    {twitter}
                  </Text>
                </div>
              ) : null}
              {instagram ? (
                <div className={styles.socialsItem}>
                  <div className={styles.socialsIcon}>
                    <InstagramOutlinedIcon />
                  </div>
                  <Text variant="body-2" color="base900">
                    {instagram}
                  </Text>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <Body userId={userId} bio={bio} />
    </div>
  );
};

export default Profile;

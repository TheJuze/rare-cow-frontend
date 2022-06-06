/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import React, { useEffect, useMemo, VFC } from 'react';
import { Avatar, Text } from 'components';

import { nullAvatar } from 'assets/img';
import { useBreakpoints, useShallowSelector } from 'hooks';
import profileSelector from 'store/profile/selectors';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfileById } from 'store/profile/actions';
import { useWalletConnectorContext } from 'services';
import styles from './styles.module.scss';

interface IFollowingProps {}

const Following: VFC<IFollowingProps> = () => {
  const [isDefaultScreen] = useBreakpoints([1179]);
  const columns = useMemo(() => (isDefaultScreen ? 2 : 3), [isDefaultScreen]);
  const { pathname } = useLocation();
  const { walletService } = useWalletConnectorContext();
  const { userId } = useParams();
  const type = useMemo(
    () => (pathname.indexOf('followers') !== -1 ? 'followers' : 'following'),
    [pathname],
  );
  const { followers, follows } = useShallowSelector(profileSelector.getProfile);
  const followings = useMemo(
    () => (type === 'followers' ? followers : follows),
    [followers, follows, type],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getProfileById({ id: userId, web3Provider: walletService.Web3() }));
    }
  }, [dispatch, userId, walletService]);
  return (
    <div className={styles.following}>
      <Text variant="subtitle-1" color="base900">
        {type === 'followers' ? 'Followers' : 'Following'}
      </Text>
      {followings && followings.length ? (
        <div
          className={styles.followingList}
          style={{
            gridTemplateColumns: `repeat(${
              followings.length > columns ? columns : followings.length
            }, 1fr)`,
          }}
        >
          {followings.map((follower: any) => (
            <div className={styles.follower}>
              <Avatar avatar={follower.avatar || nullAvatar} id={follower.url} size={56} />
              <Text variant="body-1" color="darkDefault" className={styles.followerName}>
                {follower.name}
              </Text>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Following;

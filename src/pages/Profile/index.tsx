/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useShallowSelector from 'hooks/useShallowSelector';
import React, { ReactText, useCallback, useEffect, useMemo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { follow, getProfileById, unfollow } from 'store/profile/actions';
import profileSelector from 'store/profile/selectors';
import userSelector from 'store/user/selectors';
import { useWalletConnectorContext } from 'services';

import { useBreakpoints } from 'hooks';
import { currenciesIconsMap } from 'appConstants';
import uiSelector from 'store/ui/selectors';
import profileActionTypes from 'store/profile/actionsTypes';
import { RequestStatus } from 'types';
import { ArtCardSkeleton } from 'components';
import { Body } from './components';

import styles from './styles.module.scss';
import Socials from './components/Socials';
import Header from './components/Header';

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
    [profileActionTypes.GET_PROFILE]: getProfileRequestStatus,
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

  console.log(balance);

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
    () => [followRequestStatus, unfollowRequestStatus].includes(RequestStatus.REQUEST),
    [followRequestStatus, unfollowRequestStatus],
  );

  const isGettingProfile = useMemo(
    () => getProfileRequestStatus === RequestStatus.REQUEST,
    [getProfileRequestStatus],
  );

  useEffect(() => {
    if (userId) {
      dispatch(getProfileById({ id: userId, web3Provider: walletService.Web3() }));
    }
  }, [dispatch, userId, walletService]);

  if (isMobile) {
    return (
      <div className={styles.profile}>
        {isGettingProfile ? (
          <ArtCardSkeleton key={userId} />
        ) : (
          <Header
            isMobile={isMobile}
            userId={userId}
            avatar={avatar}
            name={name}
            followersCount={followersCount}
            followsCount={followsCount}
            isUser={isUser}
            address={address}
            isFollowingInProcess={isFollowingInProcess}
            handleFollowUser={handleFollowUser}
            handleUnfollowUser={handleUnfollowUser}
            balance={mappedBalance}
            isFollowing={isFollowing}
            hasSocials={hasSocials}
            email={email}
            site={site}
            twitter={twitter}
            instagram={instagram}
          />
        )}

        <Body userId={userId} bio={bio} />

        <Socials
          hasSocials={hasSocials}
          email={email}
          site={site}
          twitter={twitter}
          instagram={instagram}
        />
      </div>
    );
  }
  return (
    <div className={styles.profile}>
      {isGettingProfile ? <ArtCardSkeleton key={userId} /> : (
        <Header
          isMobile={isMobile}
          userId={userId}
          avatar={avatar}
          name={name}
          followersCount={followersCount}
          followsCount={followsCount}
          isUser={isUser}
          address={address}
          isFollowingInProcess={isFollowingInProcess}
          handleFollowUser={handleFollowUser}
          handleUnfollowUser={handleUnfollowUser}
          balance={mappedBalance}
          isFollowing={isFollowing}
          hasSocials={hasSocials}
          email={email}
          site={site}
          twitter={twitter}
          instagram={instagram}
        />
      )}
      <Body userId={userId} bio={bio} />
    </div>
  );
};

export default Profile;

/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { balances, Button, Text } from 'components';
import Clipboard from 'components/Clipboard/Clipboard';
import useShallowSelector from 'hooks/useShallowSelector';
import React, { useEffect, useMemo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileById } from 'store/profile/actions';
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
import styles from './styles.module.scss';

interface IHeaderProps {}

const Header: VFC<IHeaderProps> = () => {
  const { walletService } = useWalletConnectorContext();
  const { userId } = useParams();
  const id = useShallowSelector(userSelector.getProp('id'));
  const { avatar, name, address, followersCount, followsCount, email, site, instagram, twitter } =
    useShallowSelector(profileSelector.getProfile);
  const dispatch = useDispatch();
  const isUser = useMemo(() => String(id) === String(userId), [id, userId]);
  const hasSocials = useMemo(
    () => Boolean(email || site || instagram || twitter),
    [email, instagram, site, twitter],
  );

  useEffect(() => {
    if (userId) {
      dispatch(getProfileById({ id: userId, web3Provider: walletService.Web3() }));
    }
  }, [dispatch, userId, walletService]);
  return (
    <div className={styles.header}>
      <img src={avatar || nullAvatar} alt="avatar" className={styles.avatar} />
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
            <Button to="/" className={styles.followers} variant="outlined" size="sm">
              <Text size="xs" weight="medium" color="accent">
                {followersCount || 0} followers
              </Text>
            </Button>
            <Button to="/" className={styles.follows} variant="outlined">
              <Text size="xs" weight="medium" color="yellow500">
                {followsCount || 0} following
              </Text>
            </Button>
          </div>
          {isUser ? (
            <div className={styles.balances}>
              {balances.map((balance) => (
                <div className={styles.balanceItem}>
                  <img src={balance.icon} alt="" className={styles.balanceItemIcon} />
                  <Text weight="medium" color="dark" className={styles.balanceText}>
                    {balance.value}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}
          {address ? <Clipboard name={address} value={address} /> : null}
          {isUser ? (
            <Button to="/" className={styles.edit}>
              Edit profile
            </Button>
          ) : (
            <Button>Follow</Button>
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
                  @{twitter}
                </Text>
              </div>
            ) : null}
            {instagram ? (
              <div className={styles.socialsItem}>
                <div className={styles.socialsIcon}>
                  <InstagramOutlinedIcon />
                </div>
                <Text variant="body-2" color="base900">
                  @{instagram}
                </Text>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

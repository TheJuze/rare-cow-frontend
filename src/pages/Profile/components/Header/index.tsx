/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { balances, Text } from 'components';
import Clipboard from 'components/Clipboard/Clipboard';
import useShallowSelector from 'hooks/useShallowSelector';
import React, { useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfileById } from 'store/profile/actions';
import profileSelector from 'store/profile/selectors';
import userSelector from 'store/user/selectors';
import { useWalletConnectorContext } from 'services';

import styles from './styles.module.scss';

interface IHeaderProps {}

const Header: VFC<IHeaderProps> = () => {
  const { walletService } = useWalletConnectorContext();
  const { userId } = useParams();
  const id = useShallowSelector(userSelector.getProp('id'));
  const { avatar, name, address, followersCount, followsCount } = useShallowSelector(
    profileSelector.getProfile,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getProfileById({ id: userId, web3Provider: walletService.Web3() }));
    }
  }, [dispatch, userId, walletService]);
  return (
    <div className={styles.header}>
      <img src={avatar} alt="avatar" className={styles.avatar} />
      <div className={styles.info}>
        <Text variant="subtitle-1" color="base900">
          {name}
        </Text>
        <div className={styles.follows}>
          <Link to="/" className={styles.followers}>
            {followersCount} followers
          </Link>
          <Link to="/" className={styles.follows}>
            {followsCount} following
          </Link>
        </div>
        {String(id) === String(userId) ? (
          <div className={styles.balances}>
            {balances.map((balance) => (
              <div className={styles.balanceItem}>
                <img src={balance.icon} alt="" className={styles.balanceItemIcon} />
                <Text size="xs">{balance.value}</Text>
              </div>
            ))}
          </div>
        ) : null}
        <Clipboard name={address} value={address} />
      </div>
    </div>
  );
};

export default Header;

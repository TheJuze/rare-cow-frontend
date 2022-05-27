import { ArrowGreen, BidedIcon } from 'assets/icons/icons';
import BigNumber from 'bignumber.js';
import {
  Avatar, Button, Input, Text,
} from 'components';
import { useShallowSelector } from 'hooks';
import React, {
  useCallback, useState, VFC, useMemo,
} from 'react';
import userSelector from 'store/user/selectors';
import { EInputStatus, TInputCaption } from 'types';
import { TokenFull } from 'types/api';

import styles from './styles.module.scss';

interface IUserBid {
  detailedNFT: TokenFull;
}

const validation = [
  {
    msg: 'You cannot bid more than you have',
    validator: (amount, { userBalance }) => amount === '' || new BigNumber(amount).isLessThanOrEqualTo(userBalance),
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValid = (amount: string, out: any) => validation
  .filter((validator) => !validator.validator(amount, out));

export const UserBid: VFC<IUserBid> = ({ detailedNFT }) => {
  const [bid, setBid] = useState('');
  const [errorsList, setErrorsList] = useState([]);
  const highestBid = useMemo(() => detailedNFT.highestBid || {}, [detailedNFT.highestBid]);
  const { USDT: USDTUserBalance } = useShallowSelector(userSelector.getProp('balance'));

  const onBidInputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newBid = e.currentTarget.value;
      const validationList = isValid(newBid, { userBalance: USDTUserBalance });
      setErrorsList(validationList);
      setBid(newBid);
    },
    [USDTUserBalance],
  );

  const newCaption = useMemo<TInputCaption>(
    () => ({
      status: errorsList.length > 0 ? EInputStatus.ERROR : EInputStatus.COMMON,
      caption: errorsList.length > 0 ? errorsList.map((e) => e.msg).join(', ') : '',
    }),
    [errorsList],
  );

  return (
    <div className={styles.wrapper}>
      {highestBid && highestBid.user ? (
        <div className={styles.bidder}>
          <Avatar id={highestBid?.user.url} avatar={highestBid?.user.avatar} size={40} />
          <Text className={styles.bidderName} color="dark" variant="body-2" weight="semiBold">
            {highestBid?.user.displayName || highestBid?.user.address}
          </Text>
          <ArrowGreen />
        </div>
      ) : null}
      <div className={styles.body}>
        <div className={styles.bodyInfo}>
          <div className={styles.bodyInfoElement}>
            <Input onChange={onBidInputChangeHandler} caption={newCaption} value={bid} name="bid" />
          </div>
          <div className={styles.bodyInfoElement}>
            <Button
              disabled={errorsList.length > 0}
              endAdornment={<BidedIcon className={styles.bidIcon} />}
            >
              Place a bid
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

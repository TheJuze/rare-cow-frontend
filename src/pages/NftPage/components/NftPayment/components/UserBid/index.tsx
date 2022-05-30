/* eslint-disable max-len */
import { fromNameToCurrencyObj } from 'appConstants';
import { ArrowGreen, PlaceABidIcon } from 'assets/icons/icons';
import BigNumber from 'bignumber.js';
import {
  Avatar, Button, Input, Text,
} from 'components';
import { useShallowSelector } from 'hooks';
import React, {
  useCallback, useState, VFC, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useWalletConnectorContext } from 'services';
import { setModalProps } from 'store/modals/reducer';
import { bid } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';
import {
  Chains, EInputStatus, TInputCaption, WalletProviders,
} from 'types';
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
const isValid = (amount: string, out: any) => validation.filter((validator) => !validator.validator(amount, out));

export const UserBid: VFC<IUserBid> = ({ detailedNFT }) => {
  const [bidValue, setBidValue] = useState('');
  const [errorsList, setErrorsList] = useState([]);
  const highestBid = useMemo(() => detailedNFT.highestBid || {}, [detailedNFT.highestBid]);
  const { USDT: USDTUserBalance } = useShallowSelector(userSelector.getProp('balance'));
  const userAddress = useShallowSelector(userSelector.getProp('address'));
  const dispatch = useDispatch();
  const { walletService, connect } = useWalletConnectorContext();

  const onBidInputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newBid = e.currentTarget.value;
      const validationList = isValid(newBid, { userBalance: USDTUserBalance });
      setErrorsList(validationList);
      setBidValue(newBid);
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

  const onBidClickHandler = useCallback(() => {
    const highestBidAmount = +highestBid.amount || +detailedNFT.price || 0;
    if (highestBidAmount < +bidValue) {
      dispatch(
        setModalProps({
          onApprove: () => onBidClickHandler(),
          onSendAgain: () => onBidClickHandler(),
          onTryAgain: () => onBidClickHandler(),
        }),
      );
      dispatch(
        bid({
          id: detailedNFT.id,
          currency: fromNameToCurrencyObj(detailedNFT?.currency?.symbol),
          amount: bidValue,
          web3Provider: walletService.Web3(),
        }),
      );
    } else {
      toast.error('You cannot set a bid lower than min');
    }
  }, [bidValue, detailedNFT?.currency?.symbol, detailedNFT.id, detailedNFT.price, dispatch, highestBid.amount, walletService]);

  const onConnectClickHandler = useCallback(async () => {
    await connect(WalletProviders.metamask, Chains.polygon);
  }, [connect]);

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
          {userAddress.length > 0 ? (
            <>
              <div className={styles.bodyInfoElement}>
                <Input
                  onChange={onBidInputChangeHandler}
                  caption={newCaption}
                  value={bidValue}
                  name="bid"
                />
              </div>
              <div className={styles.bodyInfoElement}>
                <Button
                  disabled={errorsList.length > 0 || bidValue.length === 0}
                  endAdornment={<PlaceABidIcon className={styles.bidIcon} />}
                  onClick={onBidClickHandler}
                  className={styles.placeBid}
                >
                  Place a bid
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={onConnectClickHandler}>Connect wallet</Button>
          )}
        </div>
      </div>
    </div>
  );
};

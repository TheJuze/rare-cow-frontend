/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { ArrowGreen } from 'assets/icons/icons';
import { matic } from 'assets/img';
import {
  Text,
  Countdown,
  Button,
  Selector,
  Input,
  Avatar,
  Listing,
} from 'components';
import React, { FC, useCallback, useMemo, useState } from 'react';

import styles from './styles.module.scss';

type Props = {
  endAuction: number;
  price: string | number;
  usdPrice: string | number;
  isAucSelling: boolean;
  isTimedAucSelling: boolean;
  highestBid?: any;
};
const isOwner = true;
const isUserCanBuy = true;

const NftPayment: FC<Props> = ({
  endAuction,
  price,
  usdPrice,
  isAucSelling,
  isTimedAucSelling,
  highestBid,
}) => {
  const [isTransfer, setIsTransfer] = useState(false);
  const isAuction = useMemo(
    () => isAucSelling || isTimedAucSelling,
    [isAucSelling, isTimedAucSelling],
  );

  const handleChaneTransfer = useCallback(() => {
    setIsTransfer(!isTransfer);
  }, [isTransfer]);

  return (
    <div className={styles.nftPayment}>
      {isOwner && (
        <>
          <Selector
            value={isTransfer}
            setValue={handleChaneTransfer}
            name="transfer"
            optionLeft="Transfer"
            optionRight="List for sale"
            className={styles.selector}
          />
          {isTransfer ? (
            <div className={styles.transfer}>
              <Input name="transfer" label="Send to Address" placeholder="Input address" />
              <Button className={styles.send}>
                <Text variant="body-2" color="light">
                  Send
                </Text>
              </Button>
            </div>
          ) : (
            <Listing optionsDirection="horizontal" buttonText="Create lot" className={styles.listing} />
          )}
        </>
      )}
      {isUserCanBuy && (
        <>
          <Countdown endAuction={endAuction} className={styles.countdown} />
          <div className={styles.priceWrapper}>
            {isAuction ? (
              <>
                {highestBid ? (
                  <Text size="xs" color="base900">
                    Current bid
                  </Text>
                ) : (
                  <Text size="xs" color="base900">
                    Minimal bid
                  </Text>
                )}
              </>
            ) : (
              <Text size="xs" color="base900">
                Price
              </Text>
            )}

            <div className={styles.price}>
              <img src={matic} alt="currency" className={styles.priceImage} />
              <Text color="accent" className={styles.priceText}>
                {price}
              </Text>
            </div>
            <Text className={styles.priceUsd}>$ {usdPrice}</Text>
          </div>

          {highestBid ? (
            <div className={styles.bidder}>
              <Avatar id={highestBid.user.url} avatar={highestBid.user.avatar} size={40} />
              <Text className={styles.bidderName} color="dark" variant="body-2" weight="semiBold">
                {highestBid.user.display_name || highestBid.user.address}
              </Text>
              <ArrowGreen />
            </div>
          ) : null}
          <Button className={styles.buy}>
            <Text variant="body-2" color="light">
              Buy
            </Text>
          </Button>
        </>
      )}
    </div>
  );
};
export default NftPayment;

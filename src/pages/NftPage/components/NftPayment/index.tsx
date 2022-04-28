/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { matic } from 'assets/img';
import { Text, Countdown, Button } from 'components';
import React, { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  endAuction: number;
  price: string | number;
  usdPrice: string | number;
};
const NftPayment: FC<Props> = ({ endAuction, price, usdPrice }) => {
  return (
    <div className={styles.nftPayment}>
      <Countdown endAuction={endAuction} className={styles.countdown} />
      <div className={styles.priceWrapper}>
        <Text size="xs" color="base900">
          Price
        </Text>
        <div className={styles.price}>
          <img src={matic} alt="currency" className={styles.priceImage} />
          <Text color="accent" className={styles.priceText}>{price}</Text>
        </div>
        <Text className={styles.priceUsd}>$ {usdPrice}</Text>
      </div>
      <Button className={styles.buy}><Text variant="body-2" color="light">Buy</Text></Button>
    </div>
  );
};
export default NftPayment;

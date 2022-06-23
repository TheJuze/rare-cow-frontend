import React, { VFC } from 'react';
import { Bid, Currency } from 'types/api';
import { NumberText, Text } from 'components';

import styles from '../../styles.module.scss';

interface INFTPrice {
  highestBid: Bid;
  price: string;
  usdPrice: number;
  isAuction: boolean;
  currency: Currency;
}

export const NFTPrice:VFC<INFTPrice> = ({
  highestBid, price, usdPrice, isAuction, currency,
}) => {
  if(!price && !highestBid) {
    return null;
  }
  return (
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
        {currency?.image && <img src={currency?.image} alt={currency?.name || 'currency'} className={styles.priceImage} />}
        <Text color="accent" className={styles.priceText}>
          <NumberText>{price}</NumberText>
        </Text>
      </div>
      <Text className={styles.priceUsd}>$ {usdPrice}</Text>
    </div>
  );
};

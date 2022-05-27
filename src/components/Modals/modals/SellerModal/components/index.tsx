import { Avatar, Button } from 'components';
import { NumberText } from 'components/Number';
import { QuantityInput } from 'components/QuantityInput';
import React, { useCallback, useState, VFC } from 'react';
import { Currency, Ownership } from 'types/api';

import styles from '../styles.module.scss';

interface ISellerCard {
  seller: Ownership;
  currency: Currency;
  isMultiple?: boolean;
  handleChooseSeller: (owner: Ownership, amount: string) => void;
}

export const SellerCard: VFC<ISellerCard> = ({
  seller,
  isMultiple,
  currency,
  handleChooseSeller,
}) => {
  const [quantity, setQuantity] = useState('1');
  const handleChangeQuantity = useCallback((amount) => {
    setQuantity(amount);
  }, []);
  return (
    <div className={styles.item} key={seller.url || 0}>
      <div className={styles.itemWrapper}>
        <Avatar id={seller.url || 0} avatar={seller.avatar} size="32" />
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>{seller?.name}</div>
          <div className={styles.itemQuantity}>{`${seller.sellingQuantity} token`}</div>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <div className={styles.currency}>
          <NumberText>{seller.price}</NumberText> {currency?.symbol}
        </div>
        {isMultiple && +seller.sellingQuantity > 1 && (
          <QuantityInput
            value={quantity}
            setValue={handleChangeQuantity}
            name={`amount${seller.url}`}
            minAmount={1}
            maxAmount={+seller.sellingQuantity}
            className={styles.quantity}
            inputClassName={styles.quantityInput}
          />
        )}
        <Button onClick={() => handleChooseSeller(seller, quantity)} className={styles.btn}>
          Buy
        </Button>
      </div>
    </div>
  );
};

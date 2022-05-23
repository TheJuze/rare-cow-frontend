import { currenciesIconsMap } from 'appConstants';
import { Button, Input, Text } from 'components';
import { useShallowSelector } from 'hooks';
import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import ratesSelector from 'store/rates/selectors';
import { EInputStatus } from 'types';
import { Currency } from 'types/api';
import { getTokenAmountDisplay, validateOnlyNumbers } from 'utils';

import cn from 'clsx';
import styles from './styles.module.scss';

interface IOwnerAfterListing{
  itemsAmount: number;
  currency: Currency;
  previousPrice: string;
}

export const OwnerAfterListing:VFC<IOwnerAfterListing> = ({
  itemsAmount,
  currency,
  previousPrice,
}) => {
  const [price, setPrice] = useState('');
  const rates = useShallowSelector(ratesSelector.getProp('rates'));

  const onPriceChangeHandler = useCallback((event:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    if(validateOnlyNumbers(value)) {
      setPrice(value);
    }
  }, []);

  const currentPaymentPrice = useMemo(() => {
    const requiredToken = rates.find((rate) => rate.symbol === currency.symbol);
    if(requiredToken) {
      return parseFloat(requiredToken.rate);
    }
    return parseFloat(currency.rate);
  }, [currency.rate, currency.symbol, rates]);

  return(
    <div className={styles.wrapper}>
      <div className={styles.priceSection}>
        <div className={styles.priceField}>
          <Input
            label="Price"
            caption={{
              status: EInputStatus.COMMON,
              caption: (
                <Text color="light3" size="xs">
                  $ {itemsAmount * (parseFloat(price) || 0) * currentPaymentPrice}
                </Text>
              ),
            }}
            name="price"
            value={price}
            endAdornment={<img src={currenciesIconsMap[currency.symbol]} alt={currency.name} />}
            onChange={onPriceChangeHandler}
            placeholder={getTokenAmountDisplay(previousPrice)}
          />
        </div>
        <div className={cn(styles.priceField, styles.priceUpdater)}>
          <Button variant="outlined">Update</Button>
        </div>
      </div>
      <Button className={styles.remove}>Remove from sale</Button>
    </div>
  );
};

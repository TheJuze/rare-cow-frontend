import React, {
  useCallback, useEffect, useMemo, useState, VFC,
} from 'react';

import cn from 'clsx';
import { Text } from 'components/Typography';
import { PromotionType, Rates } from 'types/api';
import {
  currencies, currenciesIconsMap, fromNameToCurrencyObj, TCurrencies,
} from 'appConstants';
import { CheckboxButton } from 'components/CheckboxButton';
import { Button } from 'components/Button';
import { ExtendedPromotionOption, TBalance } from 'types';
import BigNumber from 'bignumber.js';
import styles from './styles.module.scss';

interface IPromoteCard {
  promotionType: PromotionType;
  promotionOption: ExtendedPromotionOption;
  isSelected: boolean;
  balance: TBalance;
  rates: Rates[];
  isBuying?: boolean;
  setIsSelected: (option: ExtendedPromotionOption) => void;
  onBuy: (option: ExtendedPromotionOption) => void;
}

export const PromoteCard: VFC<IPromoteCard> = ({
  promotionOption,
  isSelected,
  promotionType,
  balance,
  rates,
  isBuying,
  setIsSelected,
  onBuy,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const onCurrencyClickHandler = useCallback(
    (currency: TCurrencies) => () => setSelectedCurrency(currency),
    [],
  );

  const timestampString = useMemo(() => {
    switch (promotionType) {
      case PromotionType.Premium: {
        return `${promotionOption.days} days`;
      }
      case PromotionType.Featured: {
        return `${promotionOption.clicks} clicks`;
      }
      default: {
        return '';
      }
    }
  }, [promotionOption.clicks, promotionOption.days, promotionType]);

  const payableToken = useMemo(
    () => Object.entries(balance).filter(([token, tokenBalance]) => {
      const tokenRate = rates.find((rate) => rate.symbol === token);
      if (tokenRate) {
        if(new BigNumber(tokenBalance).multipliedBy(tokenRate.rate).gt(promotionOption.usdPrice)) {
          return token;
        }
      }
      return false;
    })[0],
    [balance, promotionOption.usdPrice, rates],
  );

  const canPay = useMemo(
    () => payableToken,
    [payableToken],
  );

  useEffect(() => {
    setSelectedCurrency(fromNameToCurrencyObj(payableToken?.[0]));
  }, [payableToken]);

  return (
    <div
      onClick={() => setIsSelected(promotionOption)}
      className={cn(styles.wrapper, {
        [styles.selected]: isSelected,
        [styles.disabled]: !canPay || isBuying,
      })}
    >
      <div className={styles.pricing}>
        <Text variant="heading-2" color="metal700" weight="bold" tag="span">
          ${promotionOption.usdPrice}
        </Text>
        <Text tag="span" color="metal700" className={styles.slash}>
          /
        </Text>
        <Text tag="span" color="accent">
          {' '}
          {timestampString}{' '}
        </Text>
      </div>
      <hr className={styles.hr} />
      <div className={styles.currency}>
        {currencies.map((currency) => (
          <div className={styles.currencyItemWrapper}>
            <CheckboxButton
              content={(
                <div className={styles.currencyItemBody}>
                  <img
                    className={styles.currencyItemIcon}
                    src={currenciesIconsMap[currency.name]}
                    alt={currency.name}
                  />
                  {currency.name}
                </div>
              )}
              isChecked={currency.name === selectedCurrency?.name}
              onChange={onCurrencyClickHandler(currency)}
              className={styles.listingCurrencyItem}
              disabled={
                +balance[currency.name] *
                  +(rates.find((rate) => rate.symbol === currency.name)?.rate || 0) <
                +promotionOption.usdPrice
              }
            />
          </div>
        ))}
      </div>
      <div className={styles.pay}>
        <Button
          onClick={() => onBuy({ ...promotionOption, currency: selectedCurrency })}
          className={styles.payBtn}
          variant={isSelected ? 'filled' : 'outlined'}
          disabled={!canPay}
        >
          Pay
        </Button>
      </div>
    </div>
  );
};

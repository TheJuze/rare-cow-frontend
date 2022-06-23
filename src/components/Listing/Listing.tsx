/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState, VFC } from 'react';

import cn from 'clsx';

import { OptionSelector } from 'components/OptionSelector';
import { EInputStatus, TOption } from 'types';
import { currencies, currenciesIconsMap, TCurrencies } from 'appConstants';
import { CheckboxButton } from 'components/CheckboxButton';
import { Button, Input, Text } from 'components';
import { validateOnlyNumbers } from 'utils';
import { QuantityInput } from 'components/QuantityInput';
import { useShallowSelector } from 'hooks';
import nftSelector from 'store/nfts/selectors';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';
import { getFeeInfo } from 'store/nfts/actions';
import { useWalletConnectorContext } from 'services';
import styles from './styles.module.scss';

export const initialListingOptions = ['Price', 'Auction', 'Auction time'] as const;
const initialTimestampOptions = [43200, 86400, 172800] as const;

export type ListingSubmit = {
  listType: typeof initialListingOptions[number];
  currency: TCurrencies;
  timestamp: typeof initialTimestampOptions[number];
  price: string;
  amount?: string;
};

export interface ListingProps {
  className?: string;
  optionsDirection?: 'vertical' | 'horizontal';
  availableCurrencies?: TCurrencies[];
  itemsAmount?: number;
  onSubmit?: (values: ListingSubmit) => void;
  onError?: () => void;
  buttonText?: string;
  withAmount?: boolean;
  maxAmount?: number | 'infinity';
  isMultiple?: boolean;
}

const secondToHours = (seconds: number) => seconds / (60 * 60);

const excludeFromMultiple = ['Auction time', 'Auction'];

export const Listing: VFC<ListingProps> = ({
  className,
  optionsDirection,
  availableCurrencies = currencies,
  itemsAmount = 1,
  onSubmit,
  onError,
  buttonText = '',
  withAmount,
  maxAmount = 'infinity',
  isMultiple = false,
}) => {
  const { exchangeAmount } = useShallowSelector(nftSelector.getProp('fees'));
  const { walletService } = useWalletConnectorContext();
  const dispatch = useDispatch();

  const listingOptions = useMemo(
    () =>
      initialListingOptions
        .filter((opt) => (isMultiple ? !excludeFromMultiple.includes(opt) : true))
        .map<TOption>((opt) => ({
        value: opt,
        content: (
          <Text variant="body-2" weight="normal">
            {opt}
          </Text>
        ),
      })),
    [isMultiple],
  );

  useEffect(() => {
    dispatch(getFeeInfo({ web3Provider: walletService.Web3() }));
  }, [dispatch, walletService]);

  const [listType, setListType] = useState(listingOptions[0]);
  const sortedCurrencies = useMemo(
    () =>
      listType.value === 'Price'
        ? availableCurrencies
        : availableCurrencies.filter((curr) => !curr.isNative),
    [availableCurrencies, listType.value],
  );
  const onListTypeOptionClickHandler = useCallback((val: TOption) => {
    setListType(val);
  }, []);

  const [selectedCurrency, setSelectedCurrency] = useState(sortedCurrencies[0]);
  const onCurrencyClickHandler = useCallback(
    (currency: TCurrencies) => () => setSelectedCurrency(currency),
    [],
  );

  useEffect(() => {
    if (listType.value) {
      setSelectedCurrency(sortedCurrencies[0]);
    }
  }, [listType.value, sortedCurrencies]);

  const timestampOptions = useMemo(
    () =>
      initialTimestampOptions.map((timestamp) => ({
        value: timestamp,
        content: (
          <Text variant="medium-body" weight="normal">
            {secondToHours(timestamp)} h
          </Text>
        ),
      })),
    [],
  );
  const isTimestampSelectorActive = useMemo(
    () => listType.value === 'Auction time',
    [listType.value],
  );
  const [selectedTimestamp, setSelectedTimestamp] = useState(timestampOptions[0]);
  const onTimestampClickHandler = useCallback((val) => () => setSelectedTimestamp(val), []);

  const [price, setPrice] = useState('');
  const onPriceChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const currentValue = event.currentTarget.value;
      if (validateOnlyNumbers(currentValue)) setPrice(currentValue);
    },
    [],
  );

  const priceLabel = useMemo(() => {
    switch (listType.value) {
      case 'Price': {
        return 'Price';
      }
      default: {
        return 'Bid';
      }
    }
  }, [listType.value]);

  const [amount, setAmount] = useState(String(itemsAmount));

  const handleChangeAmount = useCallback((newAmount: string) => {
    setAmount(newAmount);
  }, []);

  const validateData = useCallback(() => {
    if (validateOnlyNumbers(price)) {
      return true;
    }
    return false;
  }, [price]);

  const onSubmitButtonClick = useCallback(() => {
    if (validateData()) {
      onSubmit?.({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        listType: listType.value as any,
        currency: selectedCurrency,
        timestamp: selectedTimestamp.value,
        price,
        amount: amount || '0',
      });
    } else {
      onError?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listType.value, price, selectedCurrency, selectedTimestamp.value, validateData, amount]);

  useEffect(() => {
    if (!buttonText) {
      onSubmitButtonClick();
    }
  }, [buttonText, onSubmitButtonClick]);

  return (
    <div className={cn(styles.listing, className)}>
      <div className={styles.listingType}>
        <OptionSelector
          name="listing"
          options={listingOptions}
          selected={listType}
          setSelected={onListTypeOptionClickHandler}
          dir={optionsDirection}
        />
      </div>
      {isTimestampSelectorActive && (
        <div className={styles.listingTimestamp}>
          {timestampOptions.map((timestamp) => (
            <CheckboxButton
              content={timestamp.content}
              isChecked={timestamp.value === selectedTimestamp.value}
              onChange={onTimestampClickHandler(timestamp)}
              className={styles.listingTimestampItem}
            />
          ))}
        </div>
      )}
      <div className={styles.listingCurrency}>
        {sortedCurrencies.map((currency) => (
          <div className={styles.listingCurrencyItemWrapper}>
            <CheckboxButton
              content={
                <div className={styles.listingCurrencyItemBody}>
                  <img
                    className={styles.listingCurrencyItemIcon}
                    src={currenciesIconsMap[currency.name]}
                    alt={currency.name}
                  />
                  <Text variant="body-2" weight="normal">
                    {currency.name}
                  </Text>
                </div>
              }
              isChecked={currency.name === selectedCurrency.name}
              onChange={onCurrencyClickHandler(currency)}
              className={styles.listingCurrencyItem}
            />
          </div>
        ))}
      </div>
      {(withAmount || isMultiple) && (
        <div className={styles.quantity}>
          <QuantityInput
            name="amount"
            label="Quantity"
            minAmount={1}
            value={amount}
            maxAmount={maxAmount}
            setValue={handleChangeAmount}
          />
        </div>
      )}
      <div className={styles.listingBottom}>
        <Input
          name="price"
          value={price}
          label={priceLabel}
          placeholder="0.00"
          onChange={onPriceChangeHandler}
          classNameBody={styles.listingBottomPrice}
          caption={{
            status: EInputStatus.COMMON,
            caption: (
              <Text color="light3" size="xs">
                $ {+amount * (parseFloat(price) || 0)}
              </Text>
            ),
          }}
        />
        {buttonText && (
          <Button
            disabled={parseFloat(price) <= 0 || Number.isNaN(parseFloat(price))}
            onClick={onSubmitButtonClick}
            size="sm"
            className={styles.listingBottomButton}
          >
            {buttonText}
          </Button>
        )}
        {new BigNumber(exchangeAmount).gte(0) && (
          <div className={styles.sellingFee}>
            <Text variant="body-2" color="accent">
              Selling fee is {exchangeAmount} %
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

import React, {
  ChangeEvent, useCallback, useEffect, useMemo, useState, VFC,
} from 'react';

import cn from 'clsx';

import { OptionSelector } from 'components/OptionSelector';
import { EInputStatus, TOption } from 'types';
import { currencies, currenciesIconsMap, TCurrencies } from 'appConstants';
import { CheckboxButton } from 'components/CheckboxButton';
import { Button, Input, Text } from 'components';
import { validateOnlyNumbers } from 'utils';
import styles from './styles.module.scss';

const initialListingOptions = ['Price', 'Auction', 'Auction time'] as const;
const initialTimestampOptions = [43200, 86400, 172800] as const;

export type ListingSubmit = {
  listType: typeof initialListingOptions[number];
  currency: TCurrencies;
  timestamp: typeof initialTimestampOptions[number];
  price: string;
};

export interface ListingProps {
  className?: string;
  optionsDirection?: 'vertical' | 'horizontal';
  availableCurrencies?: TCurrencies[];
  itemsAmount?: number;
  onSubmit?: (values: ListingSubmit) => void;
  onError?: () => void;
  buttonText?: string;
}

const secondToHours = (seconds: number) => seconds / (60 * 60);

export const Listing: VFC<ListingProps> = ({
  className,
  optionsDirection,
  availableCurrencies = currencies,
  itemsAmount = 1,
  onSubmit,
  onError,
  buttonText = '',
}) => {
  const listingOptions = useMemo(
    () => initialListingOptions.map<TOption>((opt) => ({ value: opt, content: opt })),
    [],
  );

  const [listType, setListType] = useState(listingOptions[0]);
  const onListTypeOptionClickHandler = useCallback((val: TOption) => {
    setListType(val);
  }, []);

  const [selectedCurrency, setSelectedCurrency] = useState(availableCurrencies[0]);
  const onCurrencyClickHandler = useCallback(
    (currency: TCurrencies) => () => setSelectedCurrency(currency),
    [],
  );

  const timestampOptions = useMemo(
    () => initialTimestampOptions.map((timestamp) => ({
      value: timestamp,
      content: `${secondToHours(timestamp)} h`,
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
      });
    } else {
      onError?.();
    }
  }, [
    listType.value,
    onError,
    onSubmit,
    price,
    selectedCurrency,
    selectedTimestamp.value,
    validateData,
  ]);

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
        {availableCurrencies.map((currency) => (
          <div className={styles.listingCurrencyItemWrapper}>
            <CheckboxButton
              content={(
                <div className={styles.listingCurrencyItemBody}>
                  <img
                    className={styles.listingCurrencyItemIcon}
                    src={currenciesIconsMap[currency.name]}
                    alt={currency.name}
                  />
                  {currency.name}
                </div>
              )}
              isChecked={currency.name === selectedCurrency.name}
              onChange={onCurrencyClickHandler(currency)}
              className={styles.listingCurrencyItem}
            />
          </div>
        ))}
      </div>
      <div className={styles.listingBottom}>
        <Input
          name="price"
          value={price}
          label={priceLabel}
          placeholder="0.00"
          onChange={onPriceChangeHandler}
          className={styles.listingBottomPrice}
          caption={{
            status: EInputStatus.COMMON,
            caption: (
              <Text color="light3" size="xs">
                $ {itemsAmount * (parseFloat(price) || 0)}
              </Text>
            ),
          }}
        />
        {buttonText && (
          <Button onClick={onSubmitButtonClick} size="sm" className={styles.listingBottomButton}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
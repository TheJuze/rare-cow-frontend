/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
import React, { useCallback, useState, VFC } from 'react';
import cn from 'classnames';
import arrowDown from 'assets/img/icons/arrowDown.svg';
import arrowUp from 'assets/img/icons/arrowUp.svg';
import { matic, usdt } from 'assets/img';
import { SortDirection } from 'hooks';
import { validateOnlyNumbers } from 'utils';
import { Button, Checkbox, CheckboxButton, Dropdown, Input, Text } from 'components';
import { CloseIcon } from 'assets/icons';
import styles from './styles.module.scss';

export interface FiltersProps {
  filters: any;
  onClose: () => void;
  isShowFilters: boolean
}

export const Filters: VFC<FiltersProps> = ({ filters, onClose, isShowFilters }) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const {
    isSingleNft,
    isMultipleNft,
    isAuction,
    activeCurrencies,
    priceDirection,
    dateDirection,
    likesDirection,
    setIsSingleNft,
    setIsMultipleNft,
    setIsAuction,
    setActiveCurrencies,
    setPriceDirection,
    setDateDirection,
    setLikesDirection,
    setMinPrice,
    setMaxPrice,
  } = filters;

  const rates = [
    {
      rate: '425.000000000',
      symbol: 'USDT',
      name: 'Usdt',
      image: usdt,
    },
    {
      rate: '123.000000000',
      symbol: 'MATIC',
      name: 'Matic',
      image: matic,
    },
  ];

  const handleChangeCurrencyValue = useCallback(
    (newCurrency) => {
      setActiveCurrencies(
        activeCurrencies.includes(newCurrency)
          ? activeCurrencies.filter((currency) => currency !== newCurrency)
          : [...activeCurrencies, newCurrency],
      );
    },
    [activeCurrencies, setActiveCurrencies],
  );

  const handleChangePriceDirection = useCallback(
    (direction: SortDirection) => {
      if (direction === priceDirection) {
        setPriceDirection('');
        return;
      }

      setPriceDirection(direction);
    },
    [priceDirection, setPriceDirection],
  );

  const handleChangeLikesDirection = useCallback(
    (direction: SortDirection) => {
      if (direction === likesDirection) {
        setLikesDirection('');
        return;
      }

      setLikesDirection(direction);
    },
    [likesDirection, setLikesDirection],
  );

  const handleChangeDateDirection = useCallback(
    (direction: SortDirection) => {
      if (direction === dateDirection) {
        setDateDirection('');
        return;
      }

      setDateDirection(direction);
    },
    [dateDirection, setDateDirection],
  );

  const handleMinValueChange = useCallback((newMinValue: string) => {
    if (!validateOnlyNumbers(newMinValue)) return;
    setMinValue(newMinValue);
  }, []);

  const handleMaxValueChange = useCallback((newMaxValue: string) => {
    if (!validateOnlyNumbers(newMaxValue)) return;
    setMaxValue(newMaxValue);
  }, []);

  const handleToggleAuction = useCallback(() => {
    setIsAuction(!isAuction);
  }, [isAuction, setIsAuction]);

  const handleSubmit = useCallback(() => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
    onClose();
  }, [minValue, maxValue, setMinPrice, setMaxPrice, onClose]);

  const handleClearAllFilters = useCallback(() => {
    setIsSingleNft(false);
    setIsMultipleNft(false);
    setIsAuction(false);
    setPriceDirection('');
    setDateDirection('');
    setLikesDirection('');
    setMinPrice('');
    setMaxPrice('');
    setMinValue('');
    setMaxValue('');
  }, [
    setIsSingleNft,
    setIsMultipleNft,
    setIsAuction,
    setPriceDirection,
    setDateDirection,
    setLikesDirection,
    setMinPrice,
    setMaxPrice,
  ]);

  const currencyOptions = [
    ...rates.map((rate, index) => ({
      id: String(index),
      content: (
        <CheckboxButton
          isChecked={activeCurrencies.includes(rate.symbol)}
          onChange={() => handleChangeCurrencyValue(rate.symbol)}
          content={
            <div className={styles.currency}>
              <img src={rate.image} alt="currency" />
              <Text variant="body-2">{rate.symbol}</Text>
            </div>
          }
        />
      ),
    })),
  ];
  const dateOptions = [
    {
      id: '0',
      content: (
        <CheckboxButton
          isChecked={dateDirection === 'desc'}
          onChange={() => handleChangeDateDirection('desc')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2">Date Last</Text>
              <img src={arrowDown} alt="arrowDown" />
            </div>
          }
        />
      ),
    },
    {
      id: '1',
      content: (
        <CheckboxButton
          isChecked={dateDirection === 'asc'}
          onChange={() => handleChangeDateDirection('asc')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2">Date New</Text>
              <img src={arrowUp} alt="arrowUp" />
            </div>
          }
        />
      ),
    },
  ];
  const likesOptions = [
    {
      id: '0',
      content: (
        <CheckboxButton
          isChecked={likesDirection === 'asc'}
          onChange={() => handleChangeLikesDirection('asc')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2">Likes</Text>
              <img src={arrowUp} alt="arrowUp" />
            </div>
          }
        />
      ),
    },
    {
      id: '1',
      content: (
        <CheckboxButton
          isChecked={likesDirection === 'desc'}
          onChange={() => handleChangeLikesDirection('desc')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2">Likes</Text>
              <img src={arrowDown} alt="arrowDown" />
            </div>
          }
        />
      ),
    },
  ];
  const priceOptions = [
    {
      id: '0',
      content: (
        <div className={styles.price}>
          <CheckboxButton
            isChecked={priceDirection === 'asc'}
            onChange={() => handleChangePriceDirection('asc')}
            content={
              <div className={styles.currency}>
                <Text variant="body-2">Price</Text>
                <img src={arrowUp} alt="arrowUp" />
              </div>
            }
          />
          <CheckboxButton
            isChecked={priceDirection === 'desc'}
            onChange={() => handleChangePriceDirection('desc')}
            content={
              <div className={styles.currency}>
                <Text variant="body-2">Price</Text>
                <img src={arrowDown} alt="arrowDown" />
              </div>
            }
          />
        </div>
      ),
    },
    {
      id: '0',
      content: (
        <div className={styles.priceInputs}>
          <div className={styles.priceTitles}>
            <Text color="light4" className={styles.priceTitle}>
              Min
            </Text>
            <Text color="light4" className={styles.priceTitle}>
              Max
            </Text>
          </div>
          <div className={styles.priceItems}>
            <div className={styles.priceItem}>
              <Input
                name="min"
                classNameBody={styles.priceInput}
                placeholder="0.00"
                value={minValue}
                onChange={(e) => handleMinValueChange(e.target.value)}
              />
            </div>
            <Text>-</Text>
            <div className={styles.priceItem}>
              <Input
                name="max"
                classNameBody={styles.priceInput}
                placeholder="0.00"
                value={maxValue}
                onChange={(e) => handleMaxValueChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className={cn(styles.filters, { [styles.active]: isShowFilters })}>
      <div className={styles.filtersHead}>
        <Text variant="body-2" className={styles.filtersTitle}>
          Filter
        </Text>
        <div
          className={styles.cross}
          role="button"
          tabIndex={0}
          onClick={() => onClose()}
        >
          <img src={CloseIcon} alt="cross" />
        </div>
      </div>
      <div className={styles.standarts}>
        <CheckboxButton
          isChecked={isSingleNft}
          onChange={() => setIsSingleNft(!isSingleNft)}
          content={<Text variant="body-2">721 NFT</Text>}
          className={styles.standart}
        />
        <CheckboxButton
          isChecked={isMultipleNft}
          onChange={() => setIsMultipleNft(!isMultipleNft)}
          content={<Text variant="body-2">1155 NFT</Text>}
          className={styles.standart}
        />
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          value={{ id: '0', content: 'Any currency' }}
          setValue={() => {}}
          classNameBody={styles.dropdownBody}
          options={currencyOptions}
          name="currency"
          variant="transparent"
          isOutsideClickClose={false}
        />
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          value={{ id: '0', content: 'Date' }}
          setValue={() => {}}
          classNameBody={styles.dropdownBody}
          options={dateOptions}
          name="date"
          variant="transparent"
          isOutsideClickClose={false}
        />
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          value={{ id: '0', content: 'Likes' }}
          setValue={() => {}}
          classNameBody={styles.dropdownBody}
          options={likesOptions}
          name="likes"
          variant="transparent"
          isOutsideClickClose={false}
        />
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          value={{ id: '0', content: 'Price' }}
          setValue={() => {}}
          classNameBody={styles.dropdownBody}
          options={priceOptions}
          name="price"
          variant="transparent"
          isOutsideClickClose={false}
        />
        {(isSingleNft ||
          isMultipleNft ||
          isAuction ||
          activeCurrencies.length ||
          priceDirection ||
          dateDirection ||
          likesDirection ||
          minValue ||
          maxValue) && (
          <div className={styles.filtersButtons}>
            <Button className={styles.btn} onClick={handleSubmit}>
              Apply
            </Button>
            <Button variant="outlined" className={styles.btn} onClick={handleClearAllFilters}>
              Clear
            </Button>
          </div>
        )}
        <div className={styles.auction}>
          <Checkbox value={isAuction} onChange={handleToggleAuction}>
            <Text size="xs">Auction</Text>
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

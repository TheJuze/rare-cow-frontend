/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
import React, { RefObject, useCallback, useMemo, useState, VFC } from 'react';
import cn from 'classnames';
import arrowDown from 'assets/img/icons/arrowDown.svg';
import arrowUp from 'assets/img/icons/arrowUp.svg';
import { matic, usdt } from 'assets/img';
import { validateOnlyNumbers } from 'utils';
import {
  Button,
  Checkbox,
  CheckboxButton,
  Dropdown,
  Input,
  SearchCollection,
  Text,
} from 'components';
import { CloseIcon } from 'assets/icons';
import BigNumber from 'bignumber.js';
import { Collection } from 'types/api';
import styles from './styles.module.scss';

export interface FiltersProps {
  filters: any;
  onClose: () => void;
  isShowFilters: boolean;
  handleChangeFilter: any;
  handleClearFilters: any;
  isWithCollections?: boolean;
  isButtonOnly?: boolean;
  className?: string;
  bodyRef?: RefObject<HTMLDivElement>;
  allCollections?: Collection[];
  searchCollectionsDisabled?: boolean;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
  currentCollectionsPage?: number;
  totalCollectionsPages?: number;
  onLoadMore?: (page: number) => void
}

export const rates = [
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

export const Filters: VFC<FiltersProps> = ({
  filters,
  onClose,
  isShowFilters,
  handleChangeFilter,
  handleClearFilters,
  isWithCollections = true,
  isButtonOnly = false,
  className,
  bodyRef,
  allCollections,
  searchCollectionsDisabled = false,
  searchValue = '',
  setSearchValue = () => {},
  currentCollectionsPage,
  totalCollectionsPages,
  onLoadMore = () => {},
}) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const { standart, isAuction, currency, collections, orderBy } = filters;
  const isApplyDisabled = useMemo(
    () =>
      minValue && maxValue && !new BigNumber(minValue).isLessThanOrEqualTo(new BigNumber(maxValue)),
    [maxValue, minValue],
  );

  const handleChangeCurrencyValue = useCallback(
    (newCurrency) => {
      handleChangeFilter(
        'currency',
        currency.includes(newCurrency)
          ? currency.filter((currentCurrency) => currentCurrency !== newCurrency)
          : [...currency, newCurrency],
      );
    },
    [currency, handleChangeFilter],
  );

  const handleChangeStandartValue = useCallback(
    (newStandart) => {
      handleChangeFilter(
        'standart',
        standart.includes(newStandart)
          ? standart.filter((currentStandart) => currentStandart !== newStandart)
          : [...standart, newStandart],
      );
    },
    [standart, handleChangeFilter],
  );

  const handleChangeDirection = useCallback(
    (direction: string) => {
      if (direction === orderBy) {
        handleChangeFilter('orderBy', '');
        return;
      }

      handleChangeFilter('orderBy', direction);
    },
    [handleChangeFilter, orderBy],
  );

  const handleMinValueChange = useCallback(
    (newMinValue: string) => {
      if (!validateOnlyNumbers(newMinValue)) return;
      setMinValue(newMinValue);
      handleChangeFilter('minPrice', newMinValue);
    },
    [handleChangeFilter],
  );

  const handleMaxValueChange = useCallback(
    (newMaxValue: string) => {
      if (!validateOnlyNumbers(newMaxValue)) return;
      setMaxValue(newMaxValue);
      handleChangeFilter('maxPrice', newMaxValue);
    },
    [handleChangeFilter],
  );

  const handleToggleAuction = useCallback(() => {
    handleChangeFilter('isAuction', !isAuction);
  }, [handleChangeFilter, isAuction]);

  const handleCollectionChange = useCallback(
    (newCollection) => {
      handleChangeFilter(
        'collections',
        collections.includes(newCollection)
          ? collections.filter((currentCollection) => currentCollection !== newCollection)
          : [...collections, newCollection],
      );
    },
    [collections, handleChangeFilter],
  );

  const handleSubmit = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleClear = useCallback(() => {
    handleClearFilters();
    setMaxValue('');
    setMinValue('');
  }, [handleClearFilters]);

  const currencyOptions = [
    ...rates.map((rate, index) => ({
      id: String(index),
      content: (
        <CheckboxButton
          isChecked={currency.includes(rate.symbol)}
          onChange={() => handleChangeCurrencyValue(rate.symbol)}
          content={
            <div className={styles.currency}>
              <img src={rate.image} alt="currency" />
              <Text variant="body-2" color="light1">
                {rate.symbol}
              </Text>
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
          isChecked={orderBy === '-created_at'}
          onChange={() => handleChangeDirection('-created_at')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2" color="light1">
                New
              </Text>
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
          isChecked={orderBy === 'created_at'}
          onChange={() => handleChangeDirection('created_at')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2" color="light1">
                Last
              </Text>
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
          isChecked={orderBy === 'likes'}
          onChange={() => handleChangeDirection('likes')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2" color="light1">
                Likes
              </Text>
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
          isChecked={orderBy === '-likes'}
          onChange={() => handleChangeDirection('-likes')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2" color="light1">
                Likes
              </Text>
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
            isChecked={orderBy === 'price'}
            onChange={() => handleChangeDirection('price')}
            content={
              <div className={styles.currency}>
                <Text variant="body-2" color="light1">
                  Price
                </Text>
                <img src={arrowUp} alt="arrowUp" />
              </div>
            }
          />
          <CheckboxButton
            isChecked={orderBy === '-price'}
            onChange={() => handleChangeDirection('-price')}
            content={
              <div className={styles.currency}>
                <Text variant="body-2" color="light1">
                  Price
                </Text>
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
    <div
      className={cn(
        styles.filters,
        className,
        { [styles.active]: isShowFilters },
        { [styles.buttonOnly]: isButtonOnly },
      )}
      ref={bodyRef}
    >
      {isWithCollections && (
        <SearchCollection
          collections={allCollections}
          className={styles.collections}
          activeCollections={collections}
          handleClickCollection={handleCollectionChange}
          disabled={searchCollectionsDisabled}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          currentPage={currentCollectionsPage}
          totalPages={totalCollectionsPages}
          onLoadMore={onLoadMore}
        />
      )}
      <div className={styles.filtersHead}>
        <Text variant="body-2" className={styles.filtersTitle} color="light1">
          Filter
        </Text>
        <div className={styles.cross} role="button" tabIndex={0} onClick={() => onClose()}>
          <img src={CloseIcon} alt="cross" />
        </div>
      </div>
      <div className={styles.standarts}>
        <CheckboxButton
          isChecked={standart.includes('ERC721')}
          onChange={() => handleChangeStandartValue('ERC721')}
          content={
            <Text variant="body-2" color="metal800">
              721 NFT
            </Text>
          }
          className={styles.standart}
        />
        <CheckboxButton
          isChecked={standart.includes('ERC1155')}
          onChange={() => handleChangeStandartValue('ERC1155')}
          content={
            <Text variant="body-2" color="metal800">
              1155 NFT
            </Text>
          }
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
        {(standart.length ||
          isAuction ||
          currency.length ||
          collections.length ||
          orderBy ||
          minValue ||
          maxValue) && (
          <div className={styles.filtersButtons}>
            <Button className={styles.btn} onClick={handleSubmit} disabled={isApplyDisabled}>
              Apply
            </Button>
            <Button variant="outlined" className={styles.btn} onClick={handleClear}>
              Clear
            </Button>
          </div>
        )}
        <div className={styles.auction}>
          <Checkbox value={isAuction} onChange={handleToggleAuction}>
            <Text size="xs" color="metal800">
              Auction
            </Text>
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

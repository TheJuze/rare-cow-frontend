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
import { collectionsMock } from 'pages/Explore/components/Body';
import styles from './styles.module.scss';

export interface FiltersProps {
  filters: any;
  onClose: () => void;
  isShowFilters: boolean;
  handleChangeFilter: any;
  handleClearFilters: any;
}

export const Filters: VFC<FiltersProps> = ({
  filters,
  onClose,
  isShowFilters,
  handleChangeFilter,
  handleClearFilters,
}) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const { ERC721, ERC1155, isAuction, currency, collections, price, date, likes } = filters;

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
      handleChangeFilter(
        'currency',
        currency.includes(newCurrency)
          ? currency.filter((currentCurrency) => currentCurrency !== newCurrency)
          : [...currency, newCurrency],
      );
    },
    [currency, handleChangeFilter],
  );

  const handleChangePriceDirection = useCallback(
    (direction: SortDirection) => {
      if (direction === price) {
        handleChangeFilter('price', '');
        return;
      }

      handleChangeFilter('price', direction);
    },
    [handleChangeFilter, price],
  );

  const handleChangeLikesDirection = useCallback(
    (direction: SortDirection) => {
      if (direction === likes) {
        handleChangeFilter('likes', '');
        return;
      }

      handleChangeFilter('likes', direction);
    },
    [handleChangeFilter, likes],
  );

  const handleChangeDateDirection = useCallback(
    (direction: SortDirection) => {
      if (direction === date) {
        handleChangeFilter('date', '');
        return;
      }

      handleChangeFilter('date', direction);
    },
    [date, handleChangeFilter],
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
          isChecked={date === 'asc'}
          onChange={() => handleChangeDateDirection('asc')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2" color="light1">
                Date New
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
          isChecked={date === 'desc'}
          onChange={() => handleChangeDateDirection('desc')}
          content={
            <div className={styles.currency}>
              <Text variant="body-2" color="light1">
                Date Last
              </Text>
              <img src={arrowDown} alt="arrowDown" />
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
          isChecked={likes === 'asc'}
          onChange={() => handleChangeLikesDirection('asc')}
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
          isChecked={likes === 'desc'}
          onChange={() => handleChangeLikesDirection('desc')}
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
            isChecked={price === 'asc'}
            onChange={() => handleChangePriceDirection('asc')}
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
            isChecked={price === 'desc'}
            onChange={() => handleChangePriceDirection('desc')}
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
    <div className={cn(styles.filters, { [styles.active]: isShowFilters })}>
      <SearchCollection
        collections={collectionsMock}
        className={styles.collections}
        activeCollections={collections}
        handleClickCollection={handleCollectionChange}
      />
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
          isChecked={ERC721}
          onChange={() => handleChangeFilter('ERC721', !ERC721)}
          content={
            <Text variant="body-2" color="metal800">
              721 NFT
            </Text>
          }
          className={styles.standart}
        />
        <CheckboxButton
          isChecked={ERC1155}
          onChange={() => handleChangeFilter('ERC1155', !ERC1155)}
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
        {(ERC721 ||
          ERC1155 ||
          isAuction ||
          currency.length ||
          collections.length ||
          price ||
          date ||
          likes ||
          minValue ||
          maxValue) && (
          <div className={styles.filtersButtons}>
            <Button className={styles.btn} onClick={handleSubmit}>
              Apply
            </Button>
            <Button variant="outlined" className={styles.btn} onClick={handleClearFilters}>
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

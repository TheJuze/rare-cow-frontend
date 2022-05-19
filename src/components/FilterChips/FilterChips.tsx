/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, VFC } from 'react';

import cn from 'classnames';
import arrowDown from 'assets/img/icons/arrowDown.svg';
import arrowUp from 'assets/img/icons/arrowUp.svg';
import { Button } from 'components/Button';
import { Text } from 'components';
import styles from './styles.module.scss';
import { Chips } from './components';

export interface FilterChipsProps {
  className?: string;
  filters: any;
  handleChangeFilter: any;
  handleClearFilters: any;
  isAppliedFilters: boolean;
}

export const FilterChips: VFC<FilterChipsProps> = ({
  className,
  filters,
  handleChangeFilter,
  handleClearFilters,
  isAppliedFilters,
}) => {
  const {
    standart,
    isAuction,
    currency,
    collections,
    orderBy,
    minPrice,
    maxPrice,
  } = filters;

  const minMaxLabel = useMemo(() => {
    if (!minPrice && !maxPrice) return '';
    return `Price: ${minPrice && 'from'} ${minPrice}  ${maxPrice && 'to'} ${maxPrice} ${
      currency.length ? currency.map((currentCurrency) => currentCurrency) : 'Any currency'
    }`;
  }, [minPrice, maxPrice, currency]);
  const isOrderByDesc = useMemo(() => orderBy.startsWith('-'), [orderBy]);
  const getOrderByLabel = (order: string) => {
    switch (order) {
      case 'price':
      case '-price':
        return 'Price';

      case 'likes':
      case '-likes':
        return 'Likes';

      default:
        return 'Date';
    }
  };
  return (
    <div className={cn(styles.filterChips, className)}>
      {collections.length ? (
        collections.map(
          (currentCollection) => (
            <Chips
              label={`Collection: ${currentCollection}`}
              onClose={() =>
                handleChangeFilter(
                  'collections',
                  collections.filter(
                    (deletedCollection) => deletedCollection !== currentCollection,
                  ),
                )
              }
            />
          ),
          [],
        )
      ) : (
        null
      )}
      {standart.length ? (
        standart.map((currentStandart) => (
          <Chips
            label={currentStandart === 'ERC721' ? 'Single NFT' : 'Multiple NFT'}
            onClose={() =>
              handleChangeFilter(
                'standart',
                standart.filter((deletedStandart) => deletedStandart !== currentStandart),
              )
            }
          />
        ))
      ) : (
        null
      )}
      {currency.length ? (
        currency.map((currentCurrency) => (
          <Chips
            label={currentCurrency}
            onClose={() =>
              handleChangeFilter(
                'currency',
                currency.filter((deletedCurrency) => deletedCurrency !== currentCurrency),
              )
            }
          />
        ))
      ) : (
        null
      )}
      {orderBy && (
        <Chips
          label={
            <div className={styles.label}>
              {getOrderByLabel(orderBy)}
              {isOrderByDesc ? (
                <img src={arrowDown} alt="arrowDown" />
              ) : (
                <img src={arrowUp} alt="arrowUp" />
              )}
            </div>
          }
          onClose={() => handleChangeFilter('orderBy', '')}
        />
      )}
      {minMaxLabel && (
        <Chips
          label={minMaxLabel}
          onClose={() => {
            handleChangeFilter('minPrice', '');
            handleChangeFilter('maxPrice', '');
          }}
        />
      )}
      {isAuction && (
        <Chips label="on Auction" onClose={() => handleChangeFilter('isAuction', false)} />
      )}
      {isAppliedFilters && (
        <Button onClick={handleClearFilters} className={styles.clear}>
          <Text color="metal50" weight="medium" size="xs">
            Clear all
          </Text>
        </Button>
      )}
    </div>
  );
};

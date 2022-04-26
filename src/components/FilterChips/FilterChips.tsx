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
    ERC721,
    ERC1155,
    isAuction,
    currency,
    collections,
    price,
    date,
    likes,
    minPrice,
    maxPrice,
  } = filters;

  const minMaxLabel = useMemo(() => {
    if (!minPrice && !maxPrice) return '';
    return `Price: ${minPrice && 'from'} ${minPrice}  ${maxPrice && 'to'} ${maxPrice} ${
      currency.length ? currency.map((currentCurrency) => currentCurrency) : 'Any currency'
    }`;
  }, [minPrice, maxPrice, currency]);
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
        <></>
      )}
      {ERC721 && <Chips label="Single NFT" onClose={() => handleChangeFilter('ERC721', false)} />}
      {ERC1155 && (
        <Chips label="Multiple NFT" onClose={() => handleChangeFilter('ERC1155', false)} />
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
        <></>
      )}
      {date && (
        <Chips
          label={
            <div className={styles.label}>
              Date
              {date === 'asc' ? (
                <img src={arrowUp} alt="arrowUp" />
              ) : (
                <img src={arrowDown} alt="arrowDown" />
              )}
            </div>
          }
          onClose={() => handleChangeFilter('date', '')}
        />
      )}
      {likes && (
        <Chips
          label={
            <div className={styles.label}>
              Likes
              {likes === 'asc' ? (
                <img src={arrowUp} alt="arrowUp" />
              ) : (
                <img src={arrowDown} alt="arrowDown" />
              )}
            </div>
          }
          onClose={() => handleChangeFilter('likes', '')}
        />
      )}
      {price && (
        <Chips
          label={
            <div className={styles.label}>
              Price
              {price === 'asc' ? (
                <img src={arrowUp} alt="arrowUp" />
              ) : (
                <img src={arrowDown} alt="arrowDown" />
              )}
            </div>
          }
          onClose={() => handleChangeFilter('price', '')}
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

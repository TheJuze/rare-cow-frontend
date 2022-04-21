/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, VFC } from 'react';

import cn from 'classnames';
import arrowDown from 'assets/img/icons/arrowDown.svg';
import arrowUp from 'assets/img/icons/arrowUp.svg';
import styles from './styles.module.scss';
import { Chips } from './components';

export interface FilterChipsProps {
  className?: string;
  filters: any;
}

export const FilterChips: VFC<FilterChipsProps> = ({ className, filters }) => {
  const {
    isSingleNft,
    isMultipleNft,
    isAuction,
    activeCurrency,
    priceDirection,
    dateDirection,
    likesDirection,
    minPrice,
    maxPrice,
    setIsSingleNft,
    setIsMultipleNft,
    setIsAuction,
    setActiveCurrency,
    setPriceDirection,
    setDateDirection,
    setLikesDirection,
    setMinPrice,
    setMaxPrice,
  } = filters;

  const minMaxLabel = useMemo(() => {
    if (!minPrice && !maxPrice) return '';
    return `Price: ${minPrice && 'from'} ${minPrice}  ${maxPrice && 'to'} ${maxPrice} ${
      activeCurrency.symbol || 'Any currency'
    }`;
  }, [minPrice, maxPrice]);
  return (
    <div className={cn(styles.filterChips, className)}>
      {isSingleNft && <Chips label="Single NFT" onClose={() => setIsSingleNft(false)} />}
      {isMultipleNft && <Chips label="Multiple NFT" onClose={() => setIsMultipleNft(false)} />}
      {activeCurrency && activeCurrency.symbol && (
        <Chips label={activeCurrency.symbol} onClose={() => setActiveCurrency({})} />
      )}
      {dateDirection && (
        <Chips
          label={
            <div className={styles.label}>
              Date
              {dateDirection === 'asc' ? (
                <img src={arrowUp} alt="arrowUp" />
              ) : (
                <img src={arrowDown} alt="arrowDown" />
              )}
            </div>
          }
          onClose={() => setDateDirection('')}
        />
      )}
      {likesDirection && (
        <Chips
          label={
            <div className={styles.label}>
              Likes
              {likesDirection === 'asc' ? (
                <img src={arrowUp} alt="arrowUp" />
              ) : (
                <img src={arrowDown} alt="arrowDown" />
              )}
            </div>
          }
          onClose={() => setLikesDirection('')}
        />
      )}
      {priceDirection && (
        <Chips
          label={
            <div className={styles.label}>
              Price
              {priceDirection === 'asc' ? (
                <img src={arrowUp} alt="arrowUp" />
              ) : (
                <img src={arrowDown} alt="arrowDown" />
              )}
            </div>
          }
          onClose={() => setPriceDirection('')}
        />
      )}
      {minMaxLabel && (
        <Chips
          label={minMaxLabel}
          onClose={() => {
            setMinPrice('');
            setMaxPrice('');
          }}
        />
      )}
      {isAuction && <Chips label="on Auction" onClose={() => setIsAuction(false)} />}
    </div>
  );
};

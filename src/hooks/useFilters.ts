/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export const useFilters = () => {
  const [isAuction, setIsAuction] = useState(false);
  const [isSingleNft, setIsSingleNft] = useState(false);
  const [isMultipleNft, setIsMultipleNft] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState<any>([]);
  const [priceDirection, setPriceDirection] = useState<SortDirection | ''>('');
  const [dateDirection, setDateDirection] = useState<SortDirection | ''>('');
  const [likesDirection, setLikesDirection] = useState<SortDirection | ''>('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return {
    // activeCollection,
    isSingleNft,
    isMultipleNft,
    isAuction,
    activeCurrency,
    priceDirection,
    dateDirection,
    likesDirection,
    minPrice,
    maxPrice,
    // setActiveCollection,
    setIsSingleNft,
    setIsMultipleNft,
    setIsAuction,
    setActiveCurrency,
    setPriceDirection,
    setDateDirection,
    setLikesDirection,
    setMinPrice,
    setMaxPrice,
  };
};

export type IFilters = ReturnType<typeof useFilters>;

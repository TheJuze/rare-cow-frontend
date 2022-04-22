/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    ERC721: false,
    ERC1155: false,
    isAuction: false,
    currency: [],
    price: '',
    date: '',
    likes: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChangeFilter = useCallback((key, value) => {
    setFilters({ ...filters, [key]: value });
  }, [filters]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      ERC721: false,
      ERC1155: false,
      isAuction: false,
      currency: [],
      price: '',
      date: '',
      likes: '',
      minPrice: '',
      maxPrice: '',
    });
  }, []);

  return {
    filters,
    handleChangeFilter,
    handleClearFilters,
  };
};

export type IFilters = ReturnType<typeof useFilters>;

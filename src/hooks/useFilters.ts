/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export const initialFiltersState = {
  standart: [],
  isAuction: false,
  currency: [],
  collections: [],
  orderBy: '',
  minPrice: '',
  maxPrice: '',
};

export const useFilters = () => {
  const [filters, setFilters] = useState(initialFiltersState);

  const handleChangeFilter = useCallback(
    (key, value) => {
      setFilters({ ...filters, [key]: value });
    },
    [filters],
  );

  const handleClearFilters = useCallback(() => {
    setFilters(initialFiltersState);
  }, []);

  return {
    filters,
    handleChangeFilter,
    handleClearFilters,
  };
};

export type IFilters = ReturnType<typeof useFilters>;

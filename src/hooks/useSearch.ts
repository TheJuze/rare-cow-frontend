import { useCallback, useEffect, useState } from 'react';

/**
 * @param {string} searchText - searching value
 * @param {any} searchObject - mapped key
 */
export const useSearch = (searchText = '', searchObject = 'collection') => {
  const [search, setSearch] = useState(searchText);

  const onSearchChange = useCallback((newSearchValue: string) => {
    setSearch(newSearchValue);
  }, []);

  useEffect(() => {
    // soon make request map for this and make debounce request
    console.log(`search ${search} with ${searchObject} object`);
  }, [search, searchObject]);

  return { searchValue: search, setSearchValue: onSearchChange };
};

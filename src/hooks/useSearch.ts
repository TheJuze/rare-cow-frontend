import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import nftActionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus, Rewrite } from 'types';
import { SearchAction, SearchNftReq } from 'types/requests';
import { debounce } from 'lodash';
import { search } from 'store/nfts/actions';
import useShallowSelector from './useShallowSelector';

const initialSearchData: Partial<
Rewrite<
SearchNftReq,
'type',
{
  type: 'items' | 'collections' | 'users' | 'categories';
}
>
> = { type: 'items', page: 1 };
const initialDelay = 500;

/**
 * @param {string} searchText - searching value
 * @param {SearchAction} searchData - mapped key
 * @param {shouldConcat} shouldConcat - concatenate searched value
 * @param {number} delay - delay of request
 */
export const useSearch = (
  searchText: string = '',
  searchData: SearchAction = {
    requestData: initialSearchData,
    shouldConcat: false,
  },
  delay = initialDelay,
) => {
  const [searchValue, setSearchValue] = useState(searchText);

  const { [nftActionTypes.SEARCH]: searchingStatus } = useShallowSelector(uiSelector.getUI);

  const isSearching = useMemo(() => searchingStatus === RequestStatus.REQUEST, [searchingStatus]);
  const dispatch = useDispatch();

  const onSearchChange = useCallback((newSearchValue: string) => {
    setSearchValue(newSearchValue);
  }, []);

  const searchFunction = useCallback(
    (text: string) => {
      if (text) {
        dispatch(
          search({
            ...searchData,
            requestData: { ...initialSearchData, ...searchData.requestData, text },
          }),
        );
      }
    },
    [dispatch, searchData],
  );

  const debouncedSearch = useRef(debounce(searchFunction, delay)).current;

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [debouncedSearch, searchValue]);

  return { searchValue, setSearchValue: onSearchChange, isSearching };
};

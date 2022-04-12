import { bananaSrc, barSrc, basketballSrc } from 'assets/img';
import { SearchInputProps } from './SearchInput';

export const searchInputPropsMocked: SearchInputProps = {
  isSearchResultsLoading: false,
  presearchedNfts: [
    {
      id: 1,
      media: bananaSrc,
      name: 'Banana',
    },
    {
      id: 2,
      media: barSrc,
      name: 'Bar',
    },
    {
      id: 3,
      media: basketballSrc,
      name: 'Basketball',
    },
  ],
  searchValue: '',
  onSearchValueChange: () => {},
};

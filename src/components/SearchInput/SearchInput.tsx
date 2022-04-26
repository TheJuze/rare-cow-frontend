/* eslint-disable max-len */
import React, {
  KeyboardEventHandler,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
  VFC,
} from 'react';

import cn from 'clsx';

import { useNavigate } from 'react-router-dom';
import { CloseIcon, SearchIcon } from 'assets/icons/icons';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { TokenFastSearch } from 'types/api/TokenFastSearch';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './styles.module.scss';
import { SearchItem } from './components/SearchItem';

export interface SearchInputProps {
  searchValue: string;
  isSearchResultsLoading: boolean;
  presearchedNfts: TokenFastSearch[];
  onSearchValueChange: (e: SyntheticEvent) => void;
  onClearSearch?: () => void;
  onSearch?: () => void;
  className?: string;
  classNameInput?: string;
  allMatches?: boolean;
  sendIsSearchActive?: (value: boolean) => void;
}
/**
 * @param {string} searchValue - search value
 * @param {boolean} isSearchResultsLoading - set the loader if the results are loading
 * @param {TokenFastSearch[]} presearchedNfts - list of components which will be displayed before user starts to type
 * @param {(e: SyntheticEvent) => void} onSearchValueChange - handler which change the search result value
 * @param {() => void} [onClearSearch = undefined] - function which will be called when the clear button has been clicked
 * @param {() => void} [onSearch = undefined] - function which well be called when 'ENTER' key has been clicked
 * @param {string} [className = undefined] - class name of the wrapper
 * @param {string} [classNameInput = undefined] - class name of the input
 * @param {boolean} [allMatches = false] - set the flag if the search should highlight all matches in the result
 */
export const SearchInput: VFC<SearchInputProps> = ({
  className,
  classNameInput,
  presearchedNfts,
  isSearchResultsLoading,
  onSearchValueChange,
  onClearSearch,
  onSearch,
  searchValue,
  sendIsSearchActive = () => {},
  allMatches = false,
}) => {
  const [isSearchActive, setSearchActive] = useState(false);
  const inputRef = useRef<HTMLImageElement | null>(null);

  const handleSearchActiveOn = useCallback(() => {
    setSearchActive(true);
    if (inputRef.current) {
      inputRef.current.focus();
      sendIsSearchActive(true);
    }
  }, []);

  const handleSearchActiveOff = useCallback(() => {
    setSearchActive(false);
    sendIsSearchActive(false);
  }, []);

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (id) => () => {
      handleSearchActiveOff();
      navigate(`/${id}`);
    },
    [handleSearchActiveOff, navigate],
  );

  const onEnterPress: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        onSearch?.();
      }
    },
    [onSearch],
  );

  const onClearClick = useCallback(() => {
    onClearSearch?.();
  }, [onClearSearch]);

  const handleBlur = useCallback(() => {
    if (!searchValue) {
      setSearchActive(false);
    }
  }, [searchValue]);

  return (
    <div className={cn(styles.searchInput, className, { [styles.active]: isSearchActive })}>
      <Input
        name="header-search-input"
        inputRef={inputRef}
        value={searchValue}
        onChange={onSearchValueChange}
        onFocus={handleSearchActiveOn}
        onBlur={handleBlur}
        onKeyPress={onEnterPress}
        placeholder="NFT Name, ID"
        startAdornment={<SearchIcon className="searchIcon" />}
        endAdornment={
          // eslint-disable-next-line no-nested-ternary
          isSearchResultsLoading ? (
            <Loader size="extra-sm" />
          ) : onClearSearch ? (
            <Button
              icon={<CloseIcon />}
              variant="outlined"
              size="sm"
              className={cn(styles.clearBtn)}
              onClick={onClearClick}
            />
          ) : (
            <svg />
          )
        }
        className={styles.input}
        classNameBody={classNameInput}
        onClick={handleSearchActiveOn}
      />

      <OutsideClickHandler onOutsideClick={handleSearchActiveOff}>
        <div
          className={cn(styles.results, {
            [styles.active]: isSearchActive && !!presearchedNfts?.length,
          })}
        >
          {presearchedNfts.map((searchItem) => (
            <SearchItem
              key={searchItem.id}
              filter={searchValue}
              onClick={handleNavigate(searchItem.id)}
              allMatches={allMatches}
              {...searchItem}
            />
          ))}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

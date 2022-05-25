/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiltersIcon } from 'assets/icons/icons';
import { Button } from 'components';
import { Filters } from 'containers';
import { useClickOutside } from 'hooks';
import React, { useRef, VFC } from 'react';

import styles from './styles.module.scss';

interface IFilterButton{
  filters: any,
  handleChangeFilter: any,
  onApply: any,
  handleClearChips: any,
  isShowFilters: boolean,
  setIsShowFilters: (state: boolean) => void;
}

export const FilterButton:VFC<IFilterButton> = ({
  filters, handleChangeFilter, handleClearChips, onApply, isShowFilters, setIsShowFilters,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(filterRef, () => setIsShowFilters(false), btnRef);

  return (
    <div className={styles.wrapper}>
      <Button
        size="md"
        variant="filled"
        color="primary"
        startAdornment={<FiltersIcon className={styles.filtersIcon} />}
        className={styles.filters}
        onClick={() => setIsShowFilters(!isShowFilters)}
        btnRef={btnRef}
      >
        Filters
      </Button>
      <Filters
        filters={filters}
        isShowFilters={isShowFilters}
        handleChangeFilter={handleChangeFilter}
        onClose={onApply}
        handleClearFilters={handleClearChips}
        isButtonOnly
        isWithCollections={false}
        className={styles.filterOptions}
        bodyRef={filterRef}
      />
    </div>
  );
};

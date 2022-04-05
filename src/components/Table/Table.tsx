import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import cx from 'classnames';
import {
  useTable,
  usePagination,
  useExpanded,
  useSortBy,
  Row,
  TableOptions,
} from 'react-table';
import ReactPaginate from 'react-paginate';
import { MAX_SIZE_PAGE_TABLE } from 'appConstants';
import type { TableSortBy } from './Table.types';
import { Text, Spinner } from '..';
import styles from './styles.module.scss';
import { TableRow, ArrowLabel, DotLabel } from './components';

const hooks = [
  useSortBy,
  useExpanded,
  usePagination,
];

export interface TableProps<T extends object = {}> extends TableOptions<T> {
  name?: string,
  pageSize?: number,
  withPagination?: boolean,
  isManualSortBy?: boolean,
  isLoading?: boolean,
  forcePage?: number,
  count?: number,
  initialSortBy?: TableSortBy,
  onPageChange?: (value: number) => void,
  onSortBy?: (value: TableSortBy) => void,
  className?: string,
  classNameTitleTable?: string,
  classNameTitleCell?: string,
  classNameCell?: string,
  title?: string,
  maxHeight?: 'auto' | number,
  childrenHeader?: ReactNode,
}

export const Table: FC<TableProps> = React.forwardRef<HTMLDivElement, TableProps>(({
  columns,
  data,
  withPagination = false,
  withSorting = false,
  isLoading = false,
  pageSize = MAX_SIZE_PAGE_TABLE,
  count = 0,
  isManualSortBy = false,
  forcePage,
  initialSortBy,
  onSortBy,
  onPageChange = () => {},
  className,
  classNameTitleTable,
  classNameTitleCell,
  classNameCell,
  title,
  maxHeight = 'auto',
  childrenHeader,
  refEndTable,
}, ref) => {
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    page,
    gotoPage,
    state: { sortBy, pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize },
      manualSortBy: isManualSortBy,
      useControlledState: (defaultState) => ({
        ...defaultState,
        pageIndex: forcePage || defaultState.pageIndex,
        sortBy: initialSortBy || defaultState.sortBy,
      }),
    },
    ...hooks,
  );

  const sortHandler = useCallback((column) => () => {
    if (column.canSort) {
      if (onSortBy) {
        onSortBy([{ id: column.id, desc: !sortBy[0]?.desc || false }]);
      } else {
        column.toggleSortBy();
      }
    }
  }, [sortBy, onSortBy]);

  const handlePageChange = useCallback((selected: number) => {
    if (forcePage !== undefined) onPageChange(selected);
    else gotoPage(selected);
  }, [forcePage, gotoPage, onPageChange]);

  const pageCount = useMemo<number>(() => {
    return Math.ceil((count || data.length) / pageSize);
  }, [data.length, pageSize, count]);

  const isPaginationVisible = useMemo<boolean>(() => {
    return ![withPagination, !isLoading, pageSize < (count || data.length)].includes(false);
  }, [withPagination, isLoading, pageSize, count, data.length]);

  return (
    <>
      <div className={cx(styles.wrap, className)} ref={ref}>
        {title && (
        <div className={styles.header}>
          <Text
            weight="bold"
            className={cx(
              styles.title,
              classNameTitleTable,
            )}
          >
            {title}
          </Text>

          <div className={styles.headerChildren}>
            {childrenHeader}
          </div>
        </div>
        )}

        <div
          className={cx(
            styles.wrapTable,
            maxHeight === 'auto' && styles.withoutScroll,
          )}
          style={{ maxHeight: `${maxHeight === 'auto' ? maxHeight : `${maxHeight}px`}` }}
        >
          <table
            {...getTableProps({
              className: styles.table,
            })}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    withSorting ? (
                      <th
                        className={cx(styles.th, classNameTitleCell)}
                        {...column.getHeaderProps(column.getSortByToggleProps({
                          style: {
                            width: column.width,
                          },
                          onClick: sortHandler(column),
                        }))}
                      >
                        <div className={styles.sortWrap}>
                          {column.render('Header')}
                          {(withSorting && column.disableSortBy) && (
                          <span className={cx(styles.sortArrows, {
                            [styles.desc]: column.isSorted && column.isSortedDesc,
                            [styles.asc]: column.isSorted && !column.isSortedDesc,
                          })}
                          />
                          )}
                        </div>
                      </th>
                    ) : (
                      <th {...column.getHeaderProps({
                        className: cx(styles.th),
                      })}
                      >
                        {column.render('Header')}
                      </th>
                    )
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {data.length ? (withPagination ? page : rows).map((row: Row, index) => {
                prepareRow(row);
                return (
                  <TableRow
                    key={row.id}
                    row={row}
                    isOdd={!!(index % 2)}
                    classNameCell={classNameCell}
                  />
                );
              }) : (
                <tr>
                  <td colSpan={columns.length} className={styles.empty}>
                    <Text className={styles.msg} align="center">No data found...</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div ref={refEndTable} />

          {isPaginationVisible && (
          <ReactPaginate
            forcePage={forcePage || pageIndex}
            previousLabel={<ArrowLabel />}
            nextLabel={<ArrowLabel direction="right" />}
            breakLabel={<DotLabel />}
            breakClassName={styles.dotWrap}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            containerClassName={styles.pagination}
            pageClassName={styles.paginationItem}
            previousClassName={styles.paginationItem}
            nextClassName={styles.paginationItem}
            disabledClassName={styles.paginationItemDisabled}
            pageLinkClassName={styles.paginationLink}
            activeLinkClassName={styles.paginationLinkActive}
            activeClassName={styles.paginationItemActive}
            previousLinkClassName={styles.paginationPreviousLink}
            nextLinkClassName={styles.paginationNextLink}
            onPageChange={({ selected }) => handlePageChange(selected)}
          />
          )}
        </div>
      </div>

      {isLoading && <Spinner className={styles.spinner} />}
    </>
  );
});

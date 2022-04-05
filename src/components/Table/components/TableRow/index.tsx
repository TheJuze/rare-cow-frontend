import React, { FC } from 'react';
import cn from 'clsx';
import type { Cell } from 'react-table';
import type { TableRowProps as Props } from 'components/Table/Table.types';
import styles from './styles.module.scss';

export const TableRow: FC<Props> = ({
  row,
  className,
  isOdd,
  classNameCell,
}) => (
  <>
    <tr
      className={cn(
        styles.row,
        { [styles.rowExpanded]: row.isExpanded && !row.subRows.length },
        className,
      )}
      {...row.getRowProps()}
    >
      {row.cells.map((cell: Cell) => (
        <td
          {...cell.getCellProps({
            className: cn(
              styles.cell,
              { [styles.secondary]: isOdd },
              classNameCell,
            ),
          })}
          style={{
            width: cell.column.width,
          }}
        >
          {cell.render('Cell')}
        </td>
      ))}
    </tr>
  </>
);

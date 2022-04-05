import { Row as ReactTableRow } from 'react-table';

export type TableRowProps<T extends object = {}> = {
  row: ReactTableRow<T>,
  isOdd: boolean;
  className?: string,
  classNameCell?: string,
};

export type TableSortBy = Array<{ id: string, desc: boolean }>;

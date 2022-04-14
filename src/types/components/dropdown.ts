import { ReactElement } from 'react';

export type TDropdownValue = {
  id: string;
  content: string | ReactElement;
  writableValue?: string;
  icon?: ReactElement
};
